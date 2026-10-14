# 🤖 Soyal Rajbahak: Developer Portfolio

My personal portfolio site, where I introduce myself as a software engineer, show my latest projects, and make it easy to get in touch. It has a dark mode toggle, a mobile menu, clickable project screenshots, and a working contact form.

**Link to project:** https://soyalrajbahak.netlify.app

## How It's Made:

**Tech used:**

![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23F7DF1E.svg?style=for-the-badge&logo=javascript&logoColor=black)
![Netlify](https://img.shields.io/badge/netlify-%2300C7B7.svg?style=for-the-badge&logo=netlify&logoColor=white)

The site is a single page with four sections (Home, Work, About, and Contact), written in plain HTML, CSS, and JavaScript with no frameworks.

**Dark mode:** colors are defined as CSS variables, and a `[data-theme="dark"]` selector swaps them all at once. On first visit, the site matches the visitor's system setting with `prefers-color-scheme`. The toggle saves their choice in `localStorage`, and a small script in the `<head>` applies the saved theme before the page renders, so there's no flash of the wrong colors.

**Navigation:** an `IntersectionObserver` watches each section and highlights the matching nav link as you scroll. On small screens, a hamburger button opens and closes the menu, updates `aria-expanded` for screen readers, and closes the menu when a link is clicked.

**Projects:** each project card shows a screenshot, a short description, the tech used, and links to the live demo and source code. Clicking a screenshot opens it full size in a lightbox, which closes with the × button, a click outside the image, or the **Escape** key, and returns focus to where the visitor was.

**Contact form:** the form uses Netlify Forms with a hidden honeypot field to block spam bots. JavaScript submits it with `fetch()` so the page doesn't reload, validates that every field is filled in, disables the button while sending, and shows a success or error message.

**Layout and accessibility:** CSS Grid lays out the project cards, About section, and contact area, and collapses them to one column on smaller screens. Headings scale smoothly with `clamp()`, and animations are turned off for visitors who have `prefers-reduced-motion` enabled.

## Optimizations

- Remove the leftover template files that the site no longer uses: the `sass` folder, the jQuery plugins in `assets/js`, Font Awesome, and `assets/css/images`. This makes the repo smaller and easier to read.
- Add my API and Node.js projects to the Work section to show JavaScript and back-end skills, not just HTML and CSS sites.
- Compress the project screenshots and convert them to WebP so the page loads faster.
- Rename image files with spaces (e.g. `Casco Property Care.png` → `casco-property-care.png`).
- Add `loading="lazy"` to the project images below the fold.

## Lessons Learned:

Building my portfolio taught me how much small details matter for the people using a site. I learned how to use CSS variables to build a full dark mode, how to prevent a theme "flash" by running a script before the page renders, and how to use `IntersectionObserver` instead of listening to every scroll event. Making the lightbox and mobile menu work with the keyboard and screen readers taught me about focus management and ARIA attributes. I also learned how to handle a form submission with `fetch()` and give the user clear feedback.

## Credits

Originally based on the [Prologue](https://html5up.net/prologue) template by HTML5 UP ([CCA 3.0 license](https://html5up.net/license)), with the design, styles, and scripts rewritten.
