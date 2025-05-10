import os
from openai import OpenAI
from manim import *
import re
import time
from dotenv import load_dotenv
import os
class AnimationGenerator:
    def __init__(self):

        load_dotenv()
        self.api_key = os.getenv("API_KEY")
        self.client = OpenAI(
            api_key=self.api_key,
            base_url="https://api.deepseek.com"
        )
        
        # Topic-specific guidelines
        self.topic_guidelines = {
            'physics': {
                'mechanics': [
                    "Show forces and their effects with appropriate vectors",
                    "Illustrate motion with velocity and acceleration arrows",
                    "Demonstrate conservation of momentum and energy",
                    "Show real-world applications of mechanical principles",
                    "Include multiple examples for each law",
                    "Show both 2D and 3D representations when appropriate",
                    "Demonstrate the relationship between force, mass, and acceleration",
                    "Illustrate action-reaction pairs clearly",
                    "Show how forces affect different types of motion",
                    "Include practical applications and real-world scenarios"
                ],
                'thermodynamics': [
                    "Show heat flow with appropriate arrows and colors",
                    "Represent temperature differences with color gradients",
                    "Illustrate work and energy transfer clearly",
                    "Show system boundaries and their changes",
                    "Demonstrate entropy changes visually"
                ],
                'electromagnetism': [
                    "Show electric and magnetic field lines",
                    "Illustrate current flow and charge movement",
                    "Demonstrate electromagnetic interactions",
                    "Use appropriate colors for positive and negative charges"
                ],
                'optics': [
                    "Show light rays and their paths",
                    "Illustrate reflection and refraction clearly",
                    "Demonstrate wave properties when relevant",
                    "Use appropriate colors for different wavelengths"
                ],
                'quantum': [
                    "Show probability distributions",
                    "Illustrate wave-particle duality",
                    "Demonstrate quantum states and transitions",
                    "Use appropriate visualizations for uncertainty"
                ],
                'relativity': [
                    "Show spacetime diagrams clearly",
                    "Illustrate time dilation and length contraction",
                    "Demonstrate mass-energy equivalence",
                    "Use appropriate visualizations for relativistic effects"
                ]
            },
            'chemistry': {
                'reactions': [
                    "Show molecular structures clearly",
                    "Illustrate bond formation and breaking",
                    "Demonstrate energy changes during reactions",
                    "Use appropriate colors for different elements"
                ],
                'thermodynamics': [
                    "Show enthalpy changes with appropriate arrows",
                    "Illustrate entropy changes in reactions",
                    "Demonstrate free energy changes",
                    "Use color gradients for temperature changes"
                ],
                'kinetics': [
                    "Show reaction progress over time",
                    "Illustrate activation energy barriers",
                    "Demonstrate collision theory",
                    "Use appropriate speed indicators"
                ],
                'equilibrium': [
                    "Show dynamic balance of reactions",
                    "Illustrate Le Chatelier's principle",
                    "Demonstrate concentration changes",
                    "Use appropriate equilibrium indicators"
                ]
            },
            'mathematics': {
                'calculus': [
                    "Show limits and continuity clearly",
                    "Illustrate derivatives and their geometric meaning",
                    "Demonstrate integrals and areas",
                    "Use appropriate scaling and units"
                ],
                'geometry': [
                    "Show geometric transformations clearly",
                    "Illustrate angles and measurements",
                    "Demonstrate geometric proofs visually",
                    "Use appropriate colors for different elements"
                ],
                'algebra': [
                    "Show equation transformations clearly",
                    "Illustrate function graphs and their properties",
                    "Demonstrate algebraic operations visually",
                    "Use appropriate mathematical notation"
                ],
                'statistics': [
                    "Show probability distributions clearly",
                    "Illustrate statistical measures",
                    "Demonstrate sampling and inference",
                    "Use appropriate scales and axes"
                ]
            }
        }
        
    def get_topic_guidelines(self, prompt):
        # Extract main topic and subtopic from prompt
        prompt_lower = prompt.lower()
        guidelines = []
        
        # Check for main topics
        for main_topic, subtopics in self.topic_guidelines.items():
            if main_topic in prompt_lower:
                # Check for subtopics
                for subtopic, subtopic_guidelines in subtopics.items():
                    if subtopic in prompt_lower:
                        guidelines.extend(subtopic_guidelines)
                        break
                # If no specific subtopic found, add general guidelines
                if not guidelines:
                    for subtopic_guidelines in subtopics.values():
                        guidelines.extend(subtopic_guidelines)
                        break
        
        return guidelines
        
    def clean_code(self, code):
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
        def format_latex(match):
            expr = match.group(1)
            # Don't add math mode if it's already there
            if not (expr.startswith('$') and expr.endswith('$')):
                return f'${expr}$'
            return expr
            
        # Find and format LaTeX expressions
        code = re.sub(r'Tex\("([^"]*)"\)', lambda m: f'Tex(r"{m.group(1)}")', code)
        code = re.sub(r'MathTex\("([^"]*)"\)', lambda m: f'MathTex(r"{m.group(1)}")', code)
        
        return code.strip()
        
    def generate_animation_code(self, prompt):
        # Get topic-specific guidelines
        topic_guidelines = self.get_topic_guidelines(prompt)
        
        # Add a unique timestamp to prevent caching
        timestamp = int(time.time())
        
        detailed_prompt = f"""Create a Manim animation that visually demonstrates {prompt}. Follow these guidelines:
        1. Focus on visual elements and minimal text
        2. Use clear, simple animations that directly illustrate the concept
        3. Include appropriate colors and visual cues
        4. Keep text to a minimum, only essential labels
        5. Use smooth transitions and clear object movements
        6. Make sure objects and their movements accurately represent the concept
        7. Use appropriate scales and proportions
        8. Include a clear title at the start
        9. End with a brief conclusion
        
        Animation Quality Guidelines:
        - Use high-quality rendering settings
        - Include multiple examples for each concept
        - Show both 2D and 3D representations when appropriate
        - Use smooth transitions between scenes
        - Include detailed visualizations
        - Show real-world applications
        - Use appropriate camera movements
        - Include zoom effects for important details
        - Use appropriate frame rates for smooth motion
        - Include multiple perspectives when relevant
        
        Scene Duration and Context Guidelines:
        - Each scene should be longer (8-12 seconds) to allow viewers to absorb information
        - Use longer wait times between animations (2-3 seconds)
        - Maintain context between scenes by keeping relevant elements visible
        - Use fade transitions between scenes to maintain visual continuity
        - Include progress indicators for multi-part explanations
        - Show previous concepts briefly when introducing new related concepts
        - Use consistent visual language throughout the animation
        - Include scene transitions that preserve context
        - Add brief recaps of previous concepts when needed
        - Use visual cues to connect related concepts across scenes
        
        Text and Explanation Guidelines:
        - Add explanation text at the bottom of the screen
        - Use Text() for regular text and MathTex() for mathematical expressions
        - Keep explanations concise and clear
        - Use appropriate font size (24-36)
        - Position text at the bottom using .to_edge(DOWN)
        - Add padding to prevent text from touching the edge
        - Use appropriate colors for better visibility
        - Animate text appearance with Write() or FadeIn()
        - Keep important text visible longer (4-5 seconds)
        - Use progressive text reveals for complex explanations
        
        Topic-specific guidelines:
        {chr(10).join(f'- {guideline}' for guideline in topic_guidelines)}
        
        IMPORTANT: 
        1. Return ONLY the Python code for the Manim animation, no explanations or text outside the code.
        2. The code should start with 'class' and end with the last class definition.
        3. Do not include imports as they will be added automatically.
        4. Use LaTeX notation for mathematical symbols (e.g., \\Delta for Δ, \\alpha for α).
        5. Always use MathTex for mathematical expressions.
        6. Use raw strings (r"...") for LaTeX expressions to avoid escape character issues.
        7. Include explanation text at the bottom of the screen.
        8. Create multiple scenes to show different aspects and examples.
        9. Use longer scene durations and maintain context between scenes.
        10. Include progress indicators and recaps when needed.
        11. MUST create at least 5 different scenes:
            - Title scene
            - Introduction scene explaining the concept
            - Multiple detailed explanation scenes (at least 3)
            - Conclusion scene
        12. Each scene MUST include:
            - Visual elements (shapes, arrows, etc.)
            - Mathematical equations where relevant
            - Explanatory text
            - Smooth animations
            - Real-world examples
        13. Unique identifier: {timestamp}
        """
        
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
                    Include explanation text at the bottom of the screen.
                    Create multiple scenes to show different aspects and examples.
                    Use high-quality rendering settings.
                    The code must be valid Python that can be executed directly.
                    Start with a class definition and end with the last class.
                    Focus on visual elements and minimal text.
                    Use longer scene durations (8-12 seconds).
                    Maintain context between scenes.
                    Include progress indicators and recaps.
                    MUST create at least 5 different scenes with detailed content.
                    Unique identifier: {timestamp}"""
                },
                {
                    "role": "user",
                    "content": detailed_prompt
                }
            ],
            stream=False, # Add some randomness to prevent caching
        )
        
        return self.clean_code(response.choices[0].message.content)

    def check_ffmpeg(self):
        try:
            os.system("ffmpeg -version > nul 2>&1")
            return True
        except:
            return False

    def create_animation(self, prompt):
        try:
            # Check for ffmpeg
            if not self.check_ffmpeg():
                print("Warning: ffmpeg not found. Please install ffmpeg for proper video rendering.")
                print("You can download it from: https://ffmpeg.org/download.html")
                return

            # Generate code using DeepSeek
            code = self.generate_animation_code(prompt)
            
            # Create a temporary file with the generated code
            with open("animation_script.py", "w", encoding='utf-8') as f:
                f.write(code)
            
            # Execute the generated code with high quality settings
            # -p: preview
            # -q: quality (h for high)
            # -h: high quality
            os.system("manim -pqh animation_script.py")
            
            print("Animation created successfully!")
            
        except Exception as e:
            print(f"Error creating animation: {str(e)}")

# Example usage
if __name__ == "__main__":
    generator = AnimationGenerator()
    
    generator.create_animation("explain radioactivity in details")
