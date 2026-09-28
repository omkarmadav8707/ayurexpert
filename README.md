# Ayurvedic Classification as a Rule-Based Expert System
### Indian Knowledge Systems (IKS) in Computational Systems — Project Topic #4

An explainable, deterministic forward-chaining expert system that translates classical Ayurvedic diagnostic epistemology (*Prakriti* and *Tridosha Pariksha*) into modern computational symbolic AI.

---

## 🌟 Overview & Key Highlights

* **Pure Web Standards**: Built using vanilla HTML5, custom modular CSS3, and standard native ES6 JavaScript modules with **zero dependencies, zero build steps, and zero package installations**.
* **100% Deterministic & Auditable**: Grounded in classical texts (*Charaka Samhita Vimanasthana 8* and *Ashtanga Hridaya Sutrasthana 1*), evaluating 96 production rules across 24 observational domains.
* **Explainable AI (XAI)**: Generates an auditable fired-rules reasoning trace connecting every classification decision directly to classical Sanskrit sutras.
* **Interactive Test Suite Runner**: Live in-browser test runner verifying 12 formal test cases (Single-Dosha, Dual-Dosha, Sama equilibrium, exact threshold boundary conditions, sparse input rejection, and permutation invariance).
* **GitHub Pages Ready**: Upload to GitHub and enable GitHub Pages under repository Settings to deploy live instantly.

---

## 🏛️ Project Structure

```text
├── index.html                 # Complete single-page application shell
├── README.md                  # Project overview and GitHub instructions
├── prd.md                     # Product Requirements Document
├── architecture.md            # System Architecture Specification
├── design.md                  # UI/UX Design System Specification
├── assets/
│   └── hero-art.jpg           # High-resolution Vedic botanical & mandala artwork
├── css/
│   ├── variables.css          # Design tokens & color palettes (Light & Dark mode)
│   ├── main.css               # Core layout, typography, navigation, buttons, footer
│   ├── assessment.css         # 24-question questionnaire UI & progress tracking
│   ├── results.css            # Score bars, 2D Barycentric SVG triangle, explainability cards
│   ├── academic.css           # Formal 8-section course submission layout & test runner
│   └── methodology.css        # Architecture flow, live threshold sliders, rule browser
└── js/
    ├── app.js                 # Application coordinator, routing, state, and test runner
    ├── data/
    │   ├── questions.js       # 24 observation questions with classical Sanskrit terms
    │   ├── rules.js           # 96 production rules with dosha weights and citations
    │   ├── doshas.js          # Ontological specifications of 3 Doshas and 7 Prakritis
    │   └── testCases.js       # 12 formal test vectors with assertions and justifications
    └── engine/
        ├── ruleEngine.js      # Forward-chaining production rule evaluator
        ├── scoring.js         # Proportional normalization & 2D Barycentric coordinate math
        ├── classifier.js      # Threshold-based decision boundary policy (dualGap, balancedGap)
        └── explainer.js       # XAI reasoning trace and key driver synthesis
```

---

## 🚀 How to Run Locally

Because this project is built with native ES6 JavaScript modules, it should be served over an HTTP server (to adhere to standard browser security policies).

### Option 1: Python (Recommended, Built-in)
In the project directory, run:
```bash
python -m http.server 8080
```
Then open: **[http://localhost:8080](http://localhost:8080)** in your browser.

### Option 2: VS Code Live Server
If you use Visual Studio Code, right-click `index.html` and select **"Open with Live Server"**.

---

## 🌐 How to Deploy to GitHub Pages (1-Click Deployment)

This repository is **100% compatible with GitHub Pages** without any compilation or GitHub Actions configuration.

1. **Initialize Git & Push to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Ayurvedic Classification Expert System"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY_NAME.git
   git push -u origin main
   ```

2. **Enable GitHub Pages:**
   * Go to your repository on GitHub.
   * Click **Settings** &rarr; **Pages** (in the left sidebar).
   * Under **Build and deployment > Branch**, select `main` and root folder `/ (root)`.
   * Click **Save**.

3. **Your Website is Live!**
   GitHub will provide a public link (e.g. `https://YOUR_USERNAME.github.io/YOUR_REPOSITORY_NAME/`) where the entire application, assessment, and interactive test runner will work worldwide.

---

## 📋 Course Submission Alignment (All 8 Criteria)

This project strictly implements all 8 mandatory submission criteria for **Topic #4: Ayurvedic Classification as a Rule-Based Expert System**:

1. **Title**: "Ayurvedic Classification as a Rule-Based Expert System (Tridosha & Prakriti Inference Engine)"
2. **Problem Statement**: Formalized in 'IKS Concept as CS Concept' representation.
3. **Conceptual Mapping Table**: Comprehensive mapping between Ayurvedic diagnostic epistemology and Computer Science/AI concepts.
4. **Algorithm Specification**: Formal mathematical notation and pseudocode for all 5 subsystems.
5. **Working Code**: Modular, dependency-free implementation with in-browser architecture inspector.
6. **Minimum 10 Test Cases**: 12 formal test cases with an automated live runner inside the UI.
7. **Complexity & Limitations**: Formal analysis of $O(|Q|+|R|)$ runtime, memory usage, knowledge acquisition bottlenecks, and clinical boundaries.
8. **Conclusion & References**: Integration of classical texts (*Charaka Samhita*, *Ashtanga Hridaya*, *Sushruta Samhita*) and modern symbolic AI literature (*Russell & Norvig*).
