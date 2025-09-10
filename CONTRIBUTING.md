# 🤝 Contribution Guide

## 🙌 Introduction

Thank you for your interest in contributing to this project! Your contributions help improve the Book of Frets and make it better for everyone.

## ⚙️ Project Setup

To get started with development, follow these steps:

- 1. Clone the repository:
  ```
  git clone https://github.com/yourusername/book-of-frets.git
  ```
- 2. Navigate to the project directory:
  ```
  cd book-of-frets
  ```
- 3. Install dependencies:
  ```
  npm install
  ```
- 4. Run the development server:
  ```
  npm run dev
  ```
  or, alternatively:
  ```
  npm run host-dev
  ```

## 🌿 Branch Naming Conventions

Please use the following conventions when naming your branches:

- `configuration/` 🌈 for changes related to themes, chords, or songs configurations.
- `feature/` ✨ for new features.
- `bugfix/` 🐞 for fixes to bugs.
- `tweak/` 🔧 for minor improvements or adjustments.

## 📜 Contribution Rules

- JSON configuration files must be placed inside the `public/` directory.
- Examples of branch names:
  - `configuration/add-new-theme` 🌈
  - `feature/songs-with-lyrics` ✨
  - `bugfix/fix-popover-content-overlapping` 🐞
  - `tweak/update-songcard-styles` 🔧

## 📝 Commit Message Conventions

When committing changes related to themes, chords, or songs, please follow these examples:

- For themes:
  ```
  [Theme-Configuration] Add new dark mode theme
  // or whatever tweaks as long as the [Theme-Configuration] tag is used
  ```
- For chords:
  ```
  [Chords-Configuration]: Update "E" chord finger positions
  // or whatever tweaks as long as the [Chords-Configuration] tag is used
  ```
- For songs:
  ```
  [Song-Configuration]: Add "DummySong" by DummyArtist
  // or whatever tweaks as long as the [Song-Configuration] tag is used
  ```

## 🚀 How to Push Branch and Open a Pull Request

- 1. Push your branch to the remote repository:
  ```
  git push -u origin your-branch-name
  ```
- 2. Open a Pull Request on GitHub from your branch to the main branch.
- 3. Provide a clear description of your changes and any relevant information.

## ✨ Thank you for contributing!
