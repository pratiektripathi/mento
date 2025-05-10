import os
from openai import OpenAI
from manim import *
import re
import json
from moviepy import VideoFileClip, concatenate_videoclips
from dotenv import load_dotenv
import os

load_dotenv()

class ModularAnimationGenerator:
    def __init__(self):
        self.api_key = os.getenv("API_KEY")
        self.client = OpenAI(
            api_key=self.api_key,
            base_url="https://api.deepseek.com"
        )
        # Create SVG directory if it doesn't exist
        os.makedirs("svgs", exist_ok=True)
        
    def get_available_svgs(self):
        """Get list of available SVG files in the svgs directory"""
        svg_files = []
        if os.path.exists("svgs"):
            svg_files = [f for f in os.listdir("svgs") if f.endswith('.svg')]
        return svg_files

    def get_subtopics(self, main_topic):
        """Get a list of subtopics to cover for the main topic"""
        prompt = f"""For the topic '{main_topic}', provide a JSON array of subtopics that should be covered in detail.
        Each subtopic should be a key concept that can be explained visually.
        Return ONLY the JSON array, no other text.
        Example format:
        [
            {{
                "title": "Subtopic Title",
                "description": "Brief description of what to cover",
                "key_points": ["Point 1", "Point 2", "Point 3"]
            }}
        ]"""
        
        response = self.client.chat.completions.create(
            model="deepseek-chat",
            messages=[
                {
                    "role": "system",
                    "content": "You are a topic analysis expert. Return only valid JSON arrays."
                },
                {
                    "role": "user",
                    "content": prompt
                }
            ],
            stream=False
        )
        
        try:
            return json.loads(response.choices[0].message.content)
        except:
            # Fallback subtopics if JSON parsing fails
            return [
                {
                    "title": "Introduction",
                    "description": "Basic concepts and definitions",
                    "key_points": ["Definition", "Historical context", "Importance"]
                },
                {
                    "title": "Main Concepts",
                    "description": "Core principles and mechanisms",
                    "key_points": ["Principle 1", "Principle 2", "Applications"]
                },
                {
                    "title": "Advanced Topics",
                    "description": "Complex phenomena and modern applications",
                    "key_points": ["Advanced concept 1", "Advanced concept 2", "Current research"]
                }
            ]

    def clean_code(self, code):
        """Clean and format the generated code"""
        # Remove markdown code block formatting
        code = re.sub(r'```python\n?', '', code)
        code = re.sub(r'```\n?', '', code)
        
        # Find the first class definition
        class_match = re.search(r'class\s+\w+\s*\(Scene\):.*?(?=class\s+\w+\s*\(Scene\):|$)', code, re.DOTALL)
        if class_match:
            code = class_match.group(0)
        
        # Remove any comments
        code = re.sub(r'#.*?\n', '\n', code)
        
        # Add necessary imports if they're not present
        if 'from manim import *' not in code:
            code = 'from manim import *\n\n' + code
            
        # Replace special characters with their LaTeX representations
        replacements = {
            'Δ': '\\Delta',
            'α': '\\alpha',
            'β': '\\beta',
            'γ': '\\gamma',
            'θ': '\\theta',
            'λ': '\\lambda',
            'μ': '\\mu',
            'π': '\\pi',
            'σ': '\\sigma',
            'φ': '\\phi',
            'ω': '\\omega',
            '∞': '\\infty',
            '±': '\\pm',
            '≤': '\\leq',
            '≥': '\\geq',
            '≠': '\\neq',
            '→': '\\rightarrow',
            '←': '\\leftarrow',
            '↔': '\\leftrightarrow',
            '°': '^\\circ'
        }
        
        for char, latex in replacements.items():
            code = code.replace(char, latex)
            
        # Ensure LaTeX expressions are properly formatted
        code = re.sub(r'Tex\("([^"]*)"\)', lambda m: f'Tex(r"{m.group(1)}")', code)
        code = re.sub(r'MathTex\("([^"]*)"\)', lambda m: f'MathTex(r"{m.group(1)}")', code)
        
        # Remove any SVG imports that don't use local files
        code = re.sub(r'SVGMobject\("(?!svgs/)[^"]*"\)', '', code)
        
        # Fix common syntax errors
        code = re.sub(r'\.scale\(([^)]+)\)', r'.scale(\1)', code)  # Fix scale syntax
        code = re.sub(r'\.move_to\(([^)]+)\)', r'.move_to(\1)', code)  # Fix move_to syntax
        code = re.sub(r'\.shift\(([^)]+)\)', r'.shift(\1)', code)  # Fix shift syntax
        
        # Fix object creation and transformation syntax
        code = re.sub(r'(\w+)\s*=\s*\.', r'\1 = Circle().', code)  # Fix missing object creation
        code = re.sub(r'(\w+)\s*=\s*\.scale', r'\1 = Circle().scale', code)  # Fix missing object before scale
        
        return code.strip()

    def generate_scene_code(self, subtopic, scene_number):
        """Generate Manim code for a single subtopic"""
        # Get list of available SVGs
        available_svgs = self.get_available_svgs()
        svg_list = "\n".join([f"- {svg}" for svg in available_svgs])
        
        prompt = f"""Create a Manim animation scene for the following subtopic:
        Title: {subtopic['title']}
        Description: {subtopic['description']}
        Key Points: {', '.join(subtopic['key_points'])}

        Requirements:
        1. Create a scene class named Scene{scene_number}
        2. Include visual elements and animations
        3. Use appropriate mathematical notation
        4. Add explanatory text
        5. Use smooth transitions
        6. Scene duration should be 8-12 seconds
        7. Include real-world examples where relevant
        8. ONLY use SVGs from the following list (if needed):
        {svg_list}
        9. Do not use any external SVGs or images
        10. Use basic shapes (Circle, Square, Rectangle, etc.) for visual elements
        11. Make sure the scene class name is exactly 'Scene{scene_number}'
        12. Follow these syntax rules:
            - Always create objects before transforming them (e.g., 'obj = Circle()' before 'obj.scale(0.5)')
            - Use proper method chaining (e.g., 'obj = Circle().scale(0.5).move_to(ORIGIN)')
            - Use proper vector syntax (e.g., UP, DOWN, LEFT, RIGHT, ORIGIN)
            - Use proper animation syntax (e.g., 'self.play(Create(obj))')
            - Never start a line with a dot (.) for transformations
            - Always create objects with proper constructors (e.g., Circle(), Square(), etc.)

        Example of correct syntax:
        ```python
        class MyScene(Scene):
            def construct(self):
                # Create objects first
                circle = Circle()
                square = Square()
                
                # Then transform them
                circle.scale(0.5).move_to(LEFT)
                square.scale(0.5).move_to(RIGHT)
                
                # Animate them
                self.play(Create(circle), Create(square))
        ```

        Return ONLY the Python code for the Manim scene, no explanations."""
        
        response = self.client.chat.completions.create(
            model="deepseek-chat",
            messages=[
                {
                    "role": "system",
                    "content": f"""You are a Manim expert. Generate ONLY Python code using Manim library.
                    Do not include any explanations or text outside the code.
                    Do not include import statements.
                    Use LaTeX notation for all mathematical symbols.
                    Always use MathTex for mathematical expressions.
                    Use raw strings (r"...") for LaTeX expressions.
                    Only use SVGs from the provided list.
                    Use basic shapes for visual elements.
                    The scene class must be named exactly 'Scene{scene_number}'.
                    Follow proper Manim syntax for object creation and transformations.
                    Always create objects before transforming them."""
                },
                {
                    "role": "user",
                    "content": prompt
                }
            ],
            stream=False,
            temperature=0.4
        )
        
        return self.clean_code(response.choices[0].message.content)

    def create_animation(self, main_topic):
        """Create a complete animation by generating all scenes in a single file"""
        try:
            print(f"\nStarting animation generation for: {main_topic}")
            print("=" * 50)
            
            # Check for SVG directory
            if not os.path.exists("svgs"):
                print("\nCreating 'svgs' directory...")
                os.makedirs("svgs", exist_ok=True)
                print("✓ Created 'svgs' directory")
            
            # Get subtopics
            print("\n1. Breaking down topic into subtopics...")
            subtopics = self.get_subtopics(main_topic)
            print(f"✓ Generated {len(subtopics)} subtopics")
            
            # Create the main animation file
            print("\n2. Generating animation code...")
            main_file_content = "from manim import *\n\n"
            
            # Generate code for each subtopic
            for i, subtopic in enumerate(subtopics, 1):
                print(f"\n   Processing subtopic {i}/{len(subtopics)}: {subtopic['title']}")
                print(f"   Description: {subtopic['description']}")
                
                # Generate code for this subtopic
                scene_code = self.generate_scene_code(subtopic, i)
                if i!=1:
                    scene_code = scene_code.replace("from manim import *\n\n","")

                    scene_code = scene_code.replace(f"class Scene{i}(Scene):","")
                    scene_code = scene_code.replace("def construct(self):","")
    
                main_file_content += f"\n{scene_code}\n"
                print(f"   ✓ Code generated for scene {i}")
            
            # Write the complete animation file
            with open("complete_animation.py", "w", encoding='utf-8') as f:
                f.write(main_file_content)
            print("\n✓ Complete animation file generated: complete_animation.py")
            
            # Render the animation
            print("\n3. Rendering complete animation...")
            # Use -a flag to render all scenes
            os.system("manim -pqh -a complete_animation.py")
            
            # Check if the video was generated
            video_file = "media/videos/complete_animation/1080p60/complete_animation.mp4"
            if os.path.exists(video_file):
                print("\n✓ Animation rendered successfully!")
                print(f"Final video saved as: {video_file}")
            else:
                print("\n✗ Failed to render animation")
            
        except Exception as e:
            print(f"\n✗ Error creating animation: {str(e)}")

# Example usage
if __name__ == "__main__":
    generator = ModularAnimationGenerator()
    generator.create_animation("electric field") 