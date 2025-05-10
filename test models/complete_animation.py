from manim import *


from manim import *

class Scene1(Scene):
    def construct(self):
        
        title = Text("Introduction to Electric Fields", font_size=36).to_edge(UP)
        self.play(Write(title))
        self.wait(0.5)

        
        definition = MathTex(r"\vec{E} = \frac{\vec{F}}{q}", font_size=32)
        definition_text = Text("Electric field is force per unit charge", font_size=24).next_to(definition, DOWN)
        self.play(Write(definition), Write(definition_text))
        self.wait(1.5)

        
        charge = Circle(radius=0.3, color=RED, fill_opacity=0.8).move_to(LEFT*3)
        charge_label = MathTex(r"+Q", font_size=24).next_to(charge, DOWN)
        
        field_lines = VGroup()
        for angle in np.linspace(0, 2*PI, 8, endpoint=False):
            line = Arrow(charge.get_center(), charge.get_center() + 2*RIGHT, buff=0)
            line.rotate(angle, about_point=charge.get_center())
            field_lines.add(line)
        
        self.play(Create(charge), Write(charge_label))
        self.play(LaggedStart(*[Create(line) for line in field_lines], lag_ratio=0.1))
        self.wait(1)

        
        units = MathTex(r"[E] = \frac{N}{C} = \frac{V}{m}", font_size=32).shift(RIGHT*3)
        dimensions = MathTex(r"\text{Dimensions: } [MLT^{-3}I^{-1}]", font_size=24).next_to(units, DOWN)
        
        self.play(FadeIn(units), FadeIn(dimensions))
        self.wait(1.5)

        
        example = Text("Examples:", font_size=24).to_edge(DOWN).shift(LEFT*3)
        bullet1 = Text("- Lightning", font_size=20).next_to(example, DOWN).align_to(example, LEFT)
        bullet2 = Text("- CRT displays", font_size=20).next_to(bullet1, DOWN).align_to(bullet1, LEFT)
        
        self.play(Write(example), Write(bullet1), Write(bullet2))
        self.wait(2)

        
        self.play(*[FadeOut(mob) for mob in self.mobjects])
        self.wait(0.5)


    
        
        title = Tex(r"Electric Field Due to Point Charges").scale(1.2)
        title.to_edge(UP)
        
        
        coulomb_law = MathTex(r"\vec{E} = k_e \frac{q}{r^2} \hat{r}").scale(1)
        coulomb_law.next_to(title, DOWN, buff=0.5)
        
        
        charge = Circle(radius=0.3, color=RED, fill_opacity=1)
        charge_label = MathTex(r"+q").scale(0.8)
        charge_group = VGroup(charge, charge_label)
        charge_group.move_to(ORIGIN)
        
        
        test_charge = Circle(radius=0.2, color=BLUE, fill_opacity=1)
        test_charge_label = MathTex(r"+q_0").scale(0.6)
        test_charge_group = VGroup(test_charge, test_charge_label)
        test_charge_group.move_to(RIGHT * 2 + UP * 1)
        
        
        field_vector = Arrow(
            start=charge.get_right(),
            end=test_charge.get_left(),
            buff=0.1,
            color=YELLOW
        )
        field_label = MathTex(r"\vec{E}").next_to(field_vector, UP, buff=0.1)
        
        
        charge1 = Circle(radius=0.3, color=RED, fill_opacity=1)
        charge1_label = MathTex(r"+q").scale(0.8)
        charge1_group = VGroup(charge1, charge1_label).move_to(LEFT * 2)
        
        charge2 = Circle(radius=0.3, color=BLUE, fill_opacity=1)
        charge2_label = MathTex(r"-q").scale(0.8)
        charge2_group = VGroup(charge2, charge2_label).move_to(RIGHT * 2)
        
        test_point = Dot(color=GREEN).move_to(UP * 1.5)
        test_point_label = Tex(r"P").next_to(test_point, UP, buff=0.1)
        
        field1 = Arrow(
            start=charge1.get_right(),
            end=test_point.get_left(),
            buff=0.1,
            color=RED
        )
        field1_label = MathTex(r"\vec{E}_1").next_to(field1, LEFT, buff=0.1)
        
        field2 = Arrow(
            start=charge2.get_left(),
            end=test_point.get_right(),
            buff=0.1,
            color=BLUE
        )
        field2_label = MathTex(r"\vec{E}_2").next_to(field2, RIGHT, buff=0.1)
        
        resultant_field = Arrow(
            start=test_point.get_center(),
            end=test_point.get_center() + UP * 0.5 + LEFT * 0.5,
            buff=0,
            color=YELLOW
        )
        resultant_label = MathTex(r"\vec{E}_{net}").next_to(resultant_field, UP, buff=0.1)
        
        superposition_eq = MathTex(r"\vec{E}_{net} = \vec{E}_1 + \vec{E}_2").scale(0.9)
        superposition_eq.to_edge(DOWN)
        
        
        self.play(Write(title))
        self.wait(0.5)
        self.play(Write(coulomb_law))
        self.wait(1)
        
        self.play(Create(charge_group))
        self.play(Create(test_charge_group))
        self.wait(0.5)
        self.play(GrowArrow(field_vector), Write(field_label))
        self.wait(1)
        
        self.play(
            FadeOut(field_vector),
            FadeOut(field_label),
            FadeOut(test_charge_group),
            charge_group.animate.move_to(LEFT * 2)
        )
        
        self.play(Create(charge2_group))
        self.play(Create(test_point), Write(test_point_label))
        self.wait(0.5)
        self.play(GrowArrow(field1), Write(field1_label))
        self.play(GrowArrow(field2), Write(field2_label))
        self.wait(0.5)
        self.play(GrowArrow(resultant_field), Write(resultant_label))
        self.play(Write(superposition_eq))
        self.wait(2)
        
        
        self.play(*[FadeOut(mob) for mob in self.mobjects])


    
        
        title = Tex(r"Electric Field Lines", font_size=48)
        self.play(Write(title))
        self.wait(0.5)
        self.play(title.animate.to_edge(UP))
        self.wait(0.5)

        
        properties = VGroup(
            Tex(r"1. Field lines start on positive charges"),
            Tex(r"2. End on negative charges"),
            Tex(r"3. Never intersect"),
            Tex(r"4. Density shows field strength")
        ).arrange(DOWN, aligned_edge=LEFT).scale(0.8).next_to(title, DOWN, buff=0.5)
        
        self.play(FadeIn(properties))
        self.wait(2)
        self.play(FadeOut(properties))

        
        pos_charge = Circle(radius=0.3, color=RED, fill_opacity=1)
        plus_sign = Tex(r"+", color=WHITE).scale(0.8).move_to(pos_charge)
        field_lines = VGroup(*[
            Line(ORIGIN, 2*vector, color=BLUE).shift(pos_charge.get_center())
            for vector in [UP, DOWN, LEFT, RIGHT, UR, UL, DR, DL]
        ])
        
        self.play(Create(pos_charge), Write(plus_sign))
        self.wait(0.5)
        self.play(LaggedStart(*[Create(line) for line in field_lines], lag_ratio=0.1))
        self.wait(1)
        self.play(FadeOut(VGroup(pos_charge, plus_sign, field_lines)))

        
        pos_charge = Circle(radius=0.3, color=RED, fill_opacity=1).shift(LEFT*2)
        neg_charge = Circle(radius=0.3, color=BLUE, fill_opacity=1).shift(RIGHT*2)
        plus_sign = Tex(r"+", color=WHITE).scale(0.8).move_to(pos_charge)
        minus_sign = Tex(r"-", color=WHITE).scale(0.8).move_to(neg_charge)
        
        
        field_lines = VGroup(
            CurvedArrow(pos_charge.get_right(), neg_charge.get_left(), color=YELLOW),
            CurvedArrow(pos_charge.get_right()+UP*0.5, neg_charge.get_left()+UP*0.5, color=YELLOW),
            CurvedArrow(pos_charge.get_right()+DOWN*0.5, neg_charge.get_left()+DOWN*0.5, color=YELLOW),
            Arrow(pos_charge.get_top(), pos_charge.get_top()+UP, color=YELLOW),
            Arrow(pos_charge.get_bottom(), pos_charge.get_bottom()+DOWN, color=YELLOW),
            Arrow(neg_charge.get_top(), neg_charge.get_top()+UP, color=YELLOW),
            Arrow(neg_charge.get_bottom(), neg_charge.get_bottom()+DOWN, color=YELLOW)
        )
        
        self.play(Create(pos_charge), Create(neg_charge), Write(plus_sign), Write(minus_sign))
        self.wait(0.5)
        self.play(LaggedStart(*[Create(line) for line in field_lines], lag_ratio=0.1))
        self.wait(2)
        self.play(FadeOut(VGroup(pos_charge, neg_charge, plus_sign, minus_sign, field_lines)))

        
        top_plate = Rectangle(height=0.2, width=4, color=RED, fill_opacity=0.5).shift(UP)
        bottom_plate = Rectangle(height=0.2, width=4, color=BLUE, fill_opacity=0.5).shift(DOWN)
        top_label = Tex(r"+ + + +", color=WHITE).scale(0.8).next_to(top_plate, UP, buff=0.1)
        bottom_label = Tex(r"- - - -", color=WHITE).scale(0.8).next_to(bottom_plate, DOWN, buff=0.1)
        
        
        field_lines = VGroup(*[
            Arrow(start, start+DOWN, color=YELLOW, buff=0)
            for start in [top_plate.get_bottom()+x*0.5*RIGHT for x in range(-3, 4)]
        ])
        
        self.play(Create(top_plate), Create(bottom_plate), Write(top_label), Write(bottom_label))
        self.wait(0.5)
        self.play(LaggedStart(*[Create(line) for line in field_lines], lag_ratio=0.1))
        self.wait(2)
        
        
        self.play(*[FadeOut(mob) for mob in self.mobjects])


    
        
        title = Tex(r"Electric Field Due to Continuous Charge Distributions").scale(0.9)
        title.to_edge(UP)
        self.play(Write(title))
        self.wait(0.5)

        
        linear_density = MathTex(r"\lambda = \frac{dq}{dl}").shift(2*UP + 3*LEFT)
        surface_density = MathTex(r"\sigma = \frac{dq}{dA}").shift(2*UP + 3*RIGHT)
        
        
        line = Line(start=LEFT, end=RIGHT, color=BLUE).shift(DOWN)
        ring = Circle(radius=1, color=RED).shift(2*DOWN + 3*LEFT)
        disk = Circle(radius=1, color=GREEN, fill_opacity=0.3).shift(2*DOWN + 3*RIGHT)
        
        
        line_label = Tex(r"Line Charge").next_to(line, DOWN)
        ring_label = Tex(r"Ring Charge").next_to(ring, DOWN)
        disk_label = Tex(r"Disk Charge").next_to(disk, DOWN)
        
        
        self.play(
            Write(linear_density),
            Write(surface_density)
        )
        self.wait(0.5)
        
        
        self.play(
            Create(line),
            Create(ring),
            Create(disk),
            Write(line_label),
            Write(ring_label),
            Write(disk_label)
        )
        self.wait(1)
        
        
        integral = MathTex(r"\vec{E} = \int \frac{k dq}{r^2} \hat{r}").shift(UP)
        self.play(Write(integral))
        self.wait(1)
        
        
        field_lines = VGroup()
        for x in np.linspace(-2, 2, 5):
            field_lines.add(Arrow(
                start=x*RIGHT + 2*UP,
                end=x*RIGHT + DOWN,
                buff=0,
                color=YELLOW
            ))
        
        self.play(LaggedStart(*[Create(line) for line in field_lines], lag_ratio=0.2))
        self.wait(1)
        
        
        capacitor = Rectangle(height=0.2, width=4, color=WHITE).shift(3*DOWN)
        capacitor_label = Tex(r"Parallel Plate Capacitor").next_to(capacitor, DOWN)
        self.play(
            FadeOut(field_lines),
            FadeOut(integral),
            Create(capacitor),
            Write(capacitor_label)
        )
        self.wait(1)
        
        
        final_eq = MathTex(r"\vec{E} = \frac{\sigma}{2\epsilon_0}").shift(UP)
        self.play(Write(final_eq))
        self.wait(2)
        
        
        self.play(*[FadeOut(mob) for mob in self.mobjects])


    
        
        title = Tex(r"Electric Dipoles and Their Fields").scale(1.2)
        title.to_edge(UP)
        self.play(Write(title))
        self.wait(0.5)

        
        dipole_def = MathTex(r"\text{Electric Dipole: }", r"\vec{p} = q\vec{d}")
        dipole_def.next_to(title, DOWN, buff=0.5)
        self.play(Write(dipole_def))
        self.wait(0.5)

        
        pos_charge = Circle(radius=0.2, color=RED, fill_opacity=1)
        neg_charge = Circle(radius=0.2, color=BLUE, fill_opacity=1)
        pos_charge.move_to(LEFT)
        neg_charge.move_to(RIGHT)
        plus = Tex(r"+").move_to(pos_charge)
        minus = Tex(r"-").move_to(neg_charge)
        dipole_line = Line(pos_charge.get_right(), neg_charge.get_left())
        dipole_vector = Arrow(ORIGIN, RIGHT*1.5, buff=0, color=YELLOW)
        dipole_vector.next_to(dipole_line, UP, buff=0.2)
        dipole_label = MathTex(r"\vec{p}").next_to(dipole_vector, UP, buff=0.1)

        dipole_group = VGroup(pos_charge, neg_charge, plus, minus, dipole_line, dipole_vector, dipole_label)
        dipole_group.scale(0.8).shift(DOWN*0.5)
        self.play(FadeIn(pos_charge), FadeIn(neg_charge), Write(plus), Write(minus))
        self.play(Create(dipole_line))
        self.play(GrowArrow(dipole_vector), Write(dipole_label))
        self.wait(1)

        
        field_lines = VGroup()
        for angle in [0, PI/4, PI/2, 3*PI/4, PI, 5*PI/4, 3*PI/2, 7*PI/4]:
            line = ParametricFunction(
                lambda t: np.array([
                    t * np.cos(angle),
                    t * np.sin(angle),
                    0
                ]),
                t_range=[0.3, 2],
                color=GREEN
            )
            field_lines.add(line)
        field_lines.scale(0.7).move_to(dipole_group)
        self.play(Create(field_lines), run_time=2)
        self.wait(0.5)

        
        axial_field = MathTex(r"E_{\text{axial}} = \frac{1}{4\pi\epsilon_0}\frac{2p}{r^3}")
        axial_field.to_edge(LEFT).shift(DOWN*2)
        equatorial_field = MathTex(r"E_{\text{equatorial}} = \frac{1}{4\pi\epsilon_0}\frac{p}{r^3}")
        equatorial_field.to_edge(RIGHT).shift(DOWN*2)
        self.play(Write(axial_field), Write(equatorial_field))
        self.wait(1)

        
        torque_eq = MathTex(r"\vec{\tau} = \vec{p} \times \vec{E}").shift(UP*1.5 + RIGHT*2)
        energy_eq = MathTex(r"U = -\vec{p} \cdot \vec{E}").next_to(torque_eq, DOWN, buff=0.5)
        self.play(Write(torque_eq), Write(energy_eq))
        self.wait(1.5)

        
        self.play(*[FadeOut(mob) for mob in self.mobjects])


    
        
        title = Tex(r"Gauss's Law and Its Applications").scale(1.2)
        title.to_edge(UP)
        self.play(Write(title))
        self.wait(1)

        
        gauss_law = MathTex(r"\oint \vec{E} \cdot d\vec{A} = \frac{Q_{\text{enc}}}{\epsilon_0}")
        gauss_law.shift(UP)
        self.play(Write(gauss_law))
        self.wait(1)

        
        explanation = Tex(r"Relates electric flux through a closed surface\\to the enclosed charge")
        explanation.next_to(gauss_law, DOWN)
        self.play(Write(explanation))
        self.wait(1)

        
        sphere = Circle(radius=1, color=BLUE)
        sphere.move_to(LEFT*3)
        sphere_label = Tex(r"Sphere").next_to(sphere, DOWN)
        
        cylinder = Rectangle(height=2, width=1, color=GREEN)
        cylinder.move_to(ORIGIN)
        cylinder_label = Tex(r"Cylinder").next_to(cylinder, DOWN)
        
        plane = Rectangle(height=0.2, width=3, color=RED)
        plane.move_to(RIGHT*3)
        plane_label = Tex(r"Plane").next_to(plane, DOWN)

        self.play(
            Create(sphere),
            Write(sphere_label),
            Create(cylinder),
            Write(cylinder_label),
            Create(plane),
            Write(plane_label)
        )
        self.wait(2)

        
        self.play(
            FadeOut(sphere),
            FadeOut(sphere_label),
            FadeOut(cylinder),
            FadeOut(cylinder_label),
            FadeOut(explanation),
            gauss_law.animate.shift(UP*2)
        )

        plane_example = Rectangle(height=0.2, width=4, color=RED)
        plane_example.move_to(ORIGIN)
        gaussian_box = Rectangle(height=2, width=4, color=BLUE, fill_opacity=0.2)
        gaussian_box.move_to(ORIGIN)
        
        plane_charge = MathTex(r"\sigma = \frac{Q}{A}").next_to(plane_example, UP)
        plane_result = MathTex(r"E = \frac{\sigma}{2\epsilon_0}").next_to(gaussian_box, DOWN)

        self.play(
            Create(plane_example),
            Create(gaussian_box),
            Write(plane_charge)
        )
        self.wait(1)
        self.play(Write(plane_result))
        self.wait(2)

        
        self.play(
            FadeOut(title),
            FadeOut(gauss_law),
            FadeOut(plane_example),
            FadeOut(gaussian_box),
            FadeOut(plane_charge),
            FadeOut(plane_result)
        )


    
        
        title = Tex(r"Conductors and Electric Fields").scale(1.2)
        title.to_edge(UP)
        
        
        conductor = Rectangle(height=2, width=3, color=BLUE, fill_opacity=0.3)
        conductor_label = Tex(r"\text{Conductor}").next_to(conductor, DOWN)
        
        
        field_lines = VGroup()
        for y in [-1.5, -1, -0.5, 0.5, 1, 1.5]:
            line = Arrow(
                start=conductor.get_right() + RIGHT * 0.5 + y * UP,
                end=conductor.get_right() + RIGHT * 2 + y * UP,
                buff=0,
                color=YELLOW
            )
            field_lines.add(line)
        
        
        no_field = Tex(r"$\vec{E} = 0$ inside conductor").scale(0.8)
        no_field.move_to(conductor.get_center())
        
        
        surface_charges = VGroup()
        for x in [-1.5, -1, -0.5, 0, 0.5, 1, 1.5]:
            for y in [-1, 1]:
                charge = Dot(
                    point=conductor.get_center() + x * RIGHT + y * UP,
                    color=RED,
                    radius=0.05
                )
                surface_charges.add(charge)
        
        
        cage = Square(side_length=2, color=GREEN, fill_opacity=0.2)
        cage_label = Tex(r"\text{Faraday Cage}").next_to(cage, DOWN)
        protected_dot = Dot(color=BLUE).move_to(cage.get_center())
        
        
        self.play(Write(title))
        self.wait(0.5)
        
        self.play(Create(conductor), Write(conductor_label))
        self.wait(0.5)
        
        self.play(Create(field_lines))
        self.wait(0.5)
        
        self.play(Write(no_field))
        self.wait(0.5)
        
        self.play(Create(surface_charges))
        self.wait(1)
        
        self.play(
            FadeOut(field_lines),
            FadeOut(no_field),
            FadeOut(surface_charges),
            conductor.animate.move_to(LEFT * 3),
            conductor_label.animate.move_to(LEFT * 3 + DOWN)
        )
        
        self.play(Create(cage), Write(cage_label))
        self.play(Create(protected_dot))
        
        
        eq = MathTex(r"\oint \vec{E} \cdot d\vec{A} = \frac{Q_{\text{enc}}}{\epsilon_0}")
        eq.next_to(cage, RIGHT * 2)
        
        self.play(Write(eq))
        self.wait(2)
        
        
        self.play(*[FadeOut(mob) for mob in self.mobjects])


    
        
        title = Text("Work and Potential in Electric Fields", font_size=36)
        self.play(Write(title))
        self.wait(1)
        self.play(FadeOut(title))

        
        charge_pos = Circle(radius=0.2, color=RED, fill_opacity=1).move_to(LEFT*3)
        charge_neg = Circle(radius=0.2, color=BLUE, fill_opacity=1).move_to(RIGHT*3)
        plus = Text("+", font_size=24).move_to(charge_pos)
        minus = Text("-", font_size=24).move_to(charge_neg)

        field_lines = VGroup()
        for angle in np.linspace(0, 2*PI, 8, endpoint=False):
            start = charge_pos.get_center() + 0.2 * np.array([np.cos(angle), np.sin(angle), 0])
            end = charge_neg.get_center() + 0.2 * np.array([np.cos(angle+PI), np.sin(angle+PI), 0])
            field_line = Arrow(start, end, buff=0, color=YELLOW)
            field_lines.add(field_line)

        self.play(Create(charge_pos), Create(charge_neg), Write(plus), Write(minus))
        self.play(Create(field_lines))
        self.wait(1)

        
        work_eq = MathTex(r"W = \int \vec{F} \cdot d\vec{r} = q \int \vec{E} \cdot d\vec{r}")
        work_eq.move_to(UP*2)
        self.play(Write(work_eq))
        self.wait(1)

        
        potential_eq = MathTex(r"\Delta V = -\int \vec{E} \cdot d\vec{r} = \frac{W}{q}")
        potential_eq.next_to(work_eq, DOWN, buff=0.5)
        self.play(Write(potential_eq))
        self.wait(1)

        
        equipotentials = VGroup()
        for r in np.linspace(0.5, 2, 4):
            equipotential = Circle(radius=r, color=GREEN)
            equipotential.move_to(charge_pos.get_center())
            equipotentials.add(equipotential)

        equipotential_text = Text("Equipotential Surfaces", font_size=24).next_to(equipotentials, DOWN)
        self.play(Create(equipotentials), Write(equipotential_text))
        self.wait(2)

        
        battery = Rectangle(height=1, width=0.5, color=BLUE).move_to(DOWN*2 + LEFT*3)
        battery_label = Text("Battery", font_size=20).next_to(battery, DOWN)
        self.play(Create(battery), Write(battery_label))
        self.wait(1)

        
        self.play(*[FadeOut(mob) for mob in self.mobjects])
        self.wait(1)


    
        
        title = Tex(r"Capacitance and Dielectrics").scale(1.2).to_edge(UP)
        self.play(Write(title))
        self.wait(0.5)

        
        plate1 = Rectangle(height=2, width=4, fill_opacity=0.5, fill_color=BLUE)
        plate2 = Rectangle(height=2, width=4, fill_opacity=0.5, fill_color=BLUE)
        plates = VGroup(plate1, plate2).arrange(DOWN, buff=1.5)
        self.play(Create(plates))
        self.wait(0.5)

        
        capacitance_eq = MathTex(r"C = \frac{Q}{V}").next_to(plates, RIGHT, buff=1)
        self.play(Write(capacitance_eq))
        self.wait(1)

        
        field_lines = VGroup()
        for y in np.linspace(-1, 1, 5):
            line = Line(
                plate1.get_bottom() + y * RIGHT,
                plate2.get_top() + y * RIGHT,
                stroke_width=2
            )
            field_lines.add(line)
        self.play(Create(field_lines))
        self.wait(1)

        
        dielectric = Rectangle(
            height=1.4,
            width=3.8,
            fill_opacity=0.3,
            fill_color=YELLOW
        ).move_to(plates.get_center())
        self.play(FadeIn(dielectric))
        self.wait(0.5)

        
        modified_lines = VGroup()
        for y in np.linspace(-1, 1, 5):
            line = Line(
                plate1.get_bottom() + y * RIGHT,
                plate2.get_top() + y * RIGHT,
                stroke_width=1.5,
                color=RED
            )
            modified_lines.add(line)
        self.play(Transform(field_lines, modified_lines))
        self.wait(1)

        
        k_eq = MathTex(r"C = \kappa C_0").next_to(capacitance_eq, DOWN, buff=0.5)
        self.play(Write(k_eq))
        self.wait(2)

        
        capacitor = Rectangle(height=0.5, width=1, fill_opacity=0.5, fill_color=GRAY)
        circuit = VGroup(
            Line(LEFT*2, ORIGIN),
            capacitor,
            Line(RIGHT, RIGHT*2)
        ).arrange(RIGHT, buff=0.1).to_edge(DOWN)
        self.play(Create(circuit))
        self.wait(1)

        
        self.play(*[FadeOut(mob) for mob in self.mobjects])
        self.wait(0.5)


    
        
        title = Text("Applications of Electric Fields", font_size=36).to_edge(UP)
        self.play(Write(title))
        self.wait(0.5)

        
        precipitator_label = Text("Electrostatic Precipitator", font_size=24).next_to(title, DOWN)
        precipitator = VGroup(
            Rectangle(height=2, width=4, fill_opacity=0.5, fill_color=BLUE),
            Line(UP*0.5, DOWN*0.5).shift(LEFT),
            Line(UP*0.5, DOWN*0.5).shift(RIGHT)
        )
        precipitator.next_to(precipitator_label, DOWN)
        self.play(FadeIn(precipitator_label), Create(precipitator))
        self.wait(1)

        
        inkjet_label = Text("Inkjet Printer", font_size=24).next_to(precipitator_label, DOWN, buff=1)
        inkjet = VGroup(
            Rectangle(height=1.5, width=3, fill_opacity=0.5, fill_color=GREEN),
            Circle(radius=0.2, fill_opacity=1, fill_color=BLACK).shift(LEFT*0.5),
            Circle(radius=0.2, fill_opacity=1, fill_color=BLACK).shift(RIGHT*0.5)
        )
        inkjet.next_to(inkjet_label, DOWN)
        self.play(FadeIn(inkjet_label), Create(inkjet))
        self.wait(1)

        
        vdg_label = Text("Van de Graaff Generator", font_size=24).next_to(inkjet_label, DOWN, buff=1)
        vdg = VGroup(
            Circle(radius=0.8, fill_opacity=0.5, fill_color=RED),
            Rectangle(height=2, width=0.5, fill_opacity=0.5, fill_color=GRAY).next_to(Circle(), DOWN, buff=0)
        )
        vdg.next_to(vdg_label, DOWN)
        self.play(FadeIn(vdg_label), Create(vdg))
        self.wait(2)

        
        equation = MathTex(r"\vec{E} = \frac{kq}{r^2}\hat{r}").scale(1.2)
        equation.next_to(vdg, DOWN, buff=1)
        self.play(Write(equation))
        self.wait(2)

        
        self.play(*[FadeOut(mob) for mob in self.mobjects])
        self.wait(0.5)
