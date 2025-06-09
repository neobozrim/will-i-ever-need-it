import { MathConcept } from '../types';

export const mathConcepts: MathConcept[] = [
  {
    id: '1',
    slug: 'quadratic-equations',
    title: 'Quadratic Equations',
    description: 'Master the fundamentals of quadratic equations and learn to solve them using various methods including factoring, completing the square, and the quadratic formula.',
    thumbnail: 'https://images.pexels.com/photos/6256065/pexels-photo-6256065.jpeg?auto=compress&cs=tinysrgb&w=400',
    difficulty: 'intermediate',
    category: 'Algebra',
    content: `
# Quadratic Equations

A quadratic equation is a polynomial equation of degree 2, which means the highest power of the variable is 2. The standard form of a quadratic equation is:

**ax² + bx + c = 0**

Where:
- a, b, and c are constants
- a ≠ 0 (otherwise it wouldn't be quadratic)
- x is the variable

## Methods of Solving

### 1. Factoring
When a quadratic can be factored, this is often the quickest method.

### 2. Quadratic Formula
The quadratic formula works for any quadratic equation:
**x = (-b ± √(b² - 4ac)) / 2a**

### 3. Completing the Square
This method involves creating a perfect square trinomial.

## Real-World Applications
Quadratic equations appear in physics (projectile motion), economics (profit optimization), and engineering (structural design).
    `
  },
  {
    id: '2',
    slug: 'calculus-derivatives',
    title: 'Calculus: Derivatives',
    description: 'Explore the concept of derivatives in calculus, understanding rates of change, slopes of curves, and their applications in real-world scenarios.',
    thumbnail: 'https://images.pexels.com/photos/8197543/pexels-photo-8197543.jpeg?auto=compress&cs=tinysrgb&w=400',
    difficulty: 'advanced',
    category: 'Calculus',
    content: `
# Derivatives in Calculus

A derivative represents the rate of change of a function with respect to its variable. It's one of the fundamental concepts in calculus.

## Definition
The derivative of a function f(x) at point x is defined as:
**f'(x) = lim(h→0) [f(x+h) - f(x)] / h**

## Geometric Interpretation
The derivative at a point represents the slope of the tangent line to the curve at that point.

## Common Derivative Rules
- **Power Rule**: d/dx(x^n) = nx^(n-1)
- **Product Rule**: d/dx(uv) = u'v + uv'
- **Chain Rule**: d/dx(f(g(x))) = f'(g(x)) · g'(x)

## Applications
Derivatives are used in optimization problems, physics (velocity and acceleration), economics (marginal analysis), and many other fields.
    `
  },
  {
    id: '3',
    slug: 'trigonometry-basics',
    title: 'Trigonometry Fundamentals',
    description: 'Learn the basics of trigonometry including sine, cosine, tangent functions and their relationships in right triangles and unit circles.',
    thumbnail: 'https://images.pexels.com/photos/6238050/pexels-photo-6238050.jpeg?auto=compress&cs=tinysrgb&w=400',
    difficulty: 'intermediate',
    category: 'Trigonometry',
    content: `
# Trigonometry Fundamentals

Trigonometry is the study of triangles and the relationships between their angles and sides.

## The Three Primary Functions
- **Sine (sin)**: opposite / hypotenuse
- **Cosine (cos)**: adjacent / hypotenuse  
- **Tangent (tan)**: opposite / adjacent

## Unit Circle
The unit circle is a circle with radius 1 centered at the origin, used to define trigonometric functions for all angles.

## Key Identities
- sin²θ + cos²θ = 1
- tan θ = sin θ / cos θ
- sin(90° - θ) = cos θ

## Applications
Trigonometry is essential in physics (wave motion), engineering (signal processing), navigation, and computer graphics.
    `
  },
  {
    id: '4',
    slug: 'linear-algebra-vectors',
    title: 'Linear Algebra: Vectors',
    description: 'Understand vectors in linear algebra, including vector operations, dot products, cross products, and their geometric interpretations.',
    thumbnail: 'https://images.pexels.com/photos/8197528/pexels-photo-8197528.jpeg?auto=compress&cs=tinysrgb&w=400',
    difficulty: 'advanced',
    category: 'Linear Algebra',
    content: `
# Vectors in Linear Algebra

A vector is a mathematical object that has both magnitude and direction. Vectors are fundamental to linear algebra and have numerous applications.

## Vector Representation
Vectors can be represented as:
- Column matrices: [x, y, z]ᵀ
- Coordinate form: (x, y, z)
- Geometric arrows in space

## Vector Operations
- **Addition**: Component-wise addition
- **Scalar Multiplication**: Multiply each component by scalar
- **Dot Product**: a·b = |a||b|cos θ
- **Cross Product**: Results in perpendicular vector

## Applications
Vectors are used in physics (forces, velocity), computer graphics (3D modeling), machine learning (feature vectors), and engineering.
    `
  },
  {
    id: '5',
    slug: 'probability-statistics',
    title: 'Probability & Statistics',
    description: 'Dive into probability theory and statistical analysis, covering distributions, hypothesis testing, and data interpretation techniques.',
    thumbnail: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=400',
    difficulty: 'intermediate',
    category: 'Statistics',
    content: `
# Probability & Statistics

Probability and statistics help us understand uncertainty and make informed decisions based on data.

## Probability Basics
- **Sample Space**: Set of all possible outcomes
- **Event**: Subset of sample space
- **Probability**: P(A) = favorable outcomes / total outcomes

## Common Distributions
- **Normal Distribution**: Bell-shaped curve
- **Binomial Distribution**: Success/failure trials
- **Poisson Distribution**: Rare events over time

## Statistical Inference
- **Hypothesis Testing**: Testing claims about populations
- **Confidence Intervals**: Range of plausible values
- **Regression Analysis**: Relationships between variables

## Applications
Used in quality control, medical research, finance, social sciences, and data science.
    `
  },
  {
    id: '6',
    slug: 'number-theory',
    title: 'Number Theory Essentials',
    description: 'Explore the fascinating world of number theory, including prime numbers, divisibility, modular arithmetic, and their cryptographic applications.',
    thumbnail: 'https://images.pexels.com/photos/6238051/pexels-photo-6238051.jpeg?auto=compress&cs=tinysrgb&w=400',
    difficulty: 'beginner',
    category: 'Number Theory',
    content: `
# Number Theory Essentials

Number theory is the study of integers and their properties. It's one of the oldest branches of mathematics with modern applications in cryptography.

## Prime Numbers
A prime number is a natural number greater than 1 that has no positive divisors other than 1 and itself.

## Fundamental Theorem of Arithmetic
Every integer greater than 1 can be uniquely factored into prime numbers.

## Modular Arithmetic
Modular arithmetic deals with remainders after division:
**a ≡ b (mod n)** means a and b have the same remainder when divided by n.

## Applications
- **Cryptography**: RSA encryption relies on prime factorization
- **Computer Science**: Hash functions and algorithms
- **Coding Theory**: Error detection and correction

## Famous Problems
- Goldbach's Conjecture
- Twin Prime Conjecture
- Riemann Hypothesis
    `
  }
];