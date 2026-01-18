# Contributing to Contract Management Platform

Thank you for your interest in contributing to the Contract Management Platform! This document provides guidelines and information for contributors.

## 📋 Table of Contents

- [Code of Conduct](#-code-of-conduct)
- [Getting Started](#-getting-started)
- [Development Setup](#-development-setup)
- [Project Structure](#-project-structure)
- [Development Workflow](#-development-workflow)
- [Coding Standards](#-coding-standards)
- [Testing](#-testing)
- [Submitting Changes](#-submitting-changes)
- [Reporting Issues](#-reporting-issues)
- [Documentation](#-documentation)

## 🤝 Code of Conduct

This project follows a code of conduct to ensure a welcoming environment for all contributors. By participating, you agree to:

- Be respectful and inclusive
- Focus on constructive feedback
- Accept responsibility for mistakes
- Show empathy towards other contributors
- Help create a positive community

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **Git** for version control
- **VS Code** (recommended) with ESLint extension

### Quick Setup

1. **Fork the repository** on GitHub
2. **Clone your fork:**
   ```bash
   git clone https://github.com/YOUR_USERNAME/CMS_Eurusys.git
   cd CMS_Eurusys
   ```
3. **Create a feature branch:**
   ```bash
   git checkout -b feature/your-feature-name
   ```
4. **Follow the development setup below**

## 🛠️ Development Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Start Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5174`

### 3. Code Quality Checks

```bash
# Run ESLint
npm run lint

# Build for production
npm run build

# Preview production build
npm run preview
```

### 4. Environment Setup

This is a frontend-only project with no additional environment configuration required. All data is stored in browser localStorage.

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   └── Header.jsx      # Navigation header with company logo
├── pages/              # Page-level components
│   ├── BlueprintPage.jsx    # Blueprint creation interface
│   ├── LabelPage.jsx        # Field management for blueprints
│   └── DashboardPage.jsx    # Contract dashboard and editor
├── styles/             # Component-specific styles
│   ├── App.css
│   ├── Header.css
│   ├── BlueprintPage.css
│   ├── LabelPage.css
│   └── DashboardPage.css
├── App.jsx             # Main app with routing logic
├── main.jsx            # Application entry point
└── index.css           # Global styles and CSS variables
```

## 🔄 Development Workflow

### 1. Choose an Issue

- Check the [Issues](https://github.com/sonikumari255jsr-sketch/CMS_Eurusys/issues) tab
- Look for issues labeled `good first issue` or `help wanted`
- Comment on the issue to indicate you're working on it

### 2. Create a Feature Branch

```bash
git checkout -b feature/descriptive-name
# or
git checkout -b fix/issue-number-description
```

### 3. Make Changes

- Write clear, focused commits
- Test your changes thoroughly
- Ensure code passes linting: `npm run lint`
- Verify the build works: `npm run build`

### 4. Test Your Changes

- Test all affected features manually
- Check responsive design on different screen sizes
- Verify data persistence works correctly
- Test edge cases and error scenarios

## 💻 Coding Standards

### JavaScript/React Guidelines

- **ES6+ Features**: Use modern JavaScript syntax
- **Functional Components**: Prefer functional components with hooks
- **Descriptive Names**: Use meaningful variable and function names
- **Component Structure**: One component per file
- **Props Destructuring**: Destructure props at the beginning of components

```javascript
// ✅ Good
function BlueprintCard({ name, fields, onEdit }) {
  const handleEdit = () => {
    onEdit(name);
  };

  return (
    <div className="blueprint-card">
      <h3>{name}</h3>
      <p>{fields.length} fields</p>
      <button onClick={handleEdit}>Edit</button>
    </div>
  );
}

// ❌ Avoid
function BlueprintCard(props) {
  return (
    <div className="blueprint-card">
      <h3>{props.name}</h3>
      <p>{props.fields.length} fields</p>
      <button onClick={() => props.onEdit(props.name)}>Edit</button>
    </div>
  );
}
```

### CSS Guidelines

- **CSS Modules**: Use scoped styling for components
- **CSS Variables**: Use defined CSS custom properties
- **Responsive Design**: Mobile-first approach
- **Consistent Naming**: BEM-like naming convention

```css
/* ✅ Good */
.blueprint-card {
  background: var(--card-background);
  border-radius: var(--border-radius);
  padding: var(--spacing-md);
}

.blueprint-card__title {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-bold);
}

/* ❌ Avoid */
.blueprintCard {
  background: white;
  border-radius: 8px;
  padding: 16px;
}
```

### Commit Message Format

Follow conventional commit format:

```
type(scope): description

[optional body]

[optional footer]
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

**Examples:**
```
feat: add contract status filtering to dashboard
fix: resolve overlapping text in contract editor
docs: update installation instructions
style: format code with prettier
```

## 🧪 Testing

### Manual Testing Checklist

Before submitting changes, verify:

- [ ] Application builds without errors: `npm run build`
- [ ] No ESLint errors: `npm run lint`
- [ ] All existing features still work
- [ ] New features work as expected
- [ ] Responsive design works on mobile/tablet/desktop
- [ ] Data persistence works correctly
- [ ] Error handling works properly
- [ ] Browser console has no errors

### Testing Scenarios

**Blueprint Creation:**
- Create blueprint with different field types
- Position fields and verify layout
- Save and reload blueprint

**Contract Management:**
- Create contract from blueprint
- Fill all field types correctly
- Test status transitions
- Verify read-only behavior for locked contracts

**Dashboard:**
- Filter contracts by status
- Search functionality
- Edit/view contract actions

## 📝 Submitting Changes

### Pull Request Process

1. **Ensure your branch is up to date:**
   ```bash
   git fetch origin
   git rebase origin/main
   ```

2. **Create a Pull Request:**
   - Go to the repository on GitHub
   - Click "New Pull Request"
   - Select your feature branch
   - Fill out the PR template

3. **PR Description Requirements:**
   - Clear title describing the change
   - Detailed description of what was changed
   - Screenshots for UI changes
   - Testing instructions
   - Related issue numbers

4. **Wait for Review:**
   - Address any requested changes
   - Ensure CI checks pass
   - Get approval from maintainers

### PR Template

```markdown
## Description
Brief description of the changes made.

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
Describe how you tested the changes.

## Screenshots (if applicable)
Add screenshots of UI changes.

## Related Issues
Fixes #123
```

## 🐛 Reporting Issues

### Bug Reports

When reporting bugs, please include:

1. **Clear Title**: Describe the issue concisely
2. **Steps to Reproduce**: Numbered steps to reproduce the bug
3. **Expected Behavior**: What should happen
4. **Actual Behavior**: What actually happens
5. **Environment**: Browser, OS, Node version
6. **Screenshots**: If applicable
7. **Additional Context**: Any other relevant information

### Feature Requests

For new features, please include:

1. **Clear Title**: Feature name or brief description
2. **Problem Statement**: What problem does this solve?
3. **Proposed Solution**: How should it work?
4. **Alternatives Considered**: Other approaches you thought about
5. **Additional Context**: Mockups, examples, etc.

## 📚 Documentation

### Updating Documentation

- Keep README.md up to date with new features
- Update code comments for complex logic
- Document any new dependencies or setup steps
- Update this CONTRIBUTING.md as needed

### Code Comments

```javascript
// ✅ Good: Explains why, not what
function validateContractTransition(currentStatus, newStatus) {
  // Contract can only move forward or be revoked
  // Locked contracts cannot change status
  if (currentStatus === 'locked') return false;
  // ... rest of validation
}

// ❌ Avoid: Obvious comments
function validateContractTransition(currentStatus, newStatus) {
  // Check if current status is locked
  if (currentStatus === 'locked') return false;
}
```

## 🎯 Areas for Contribution

### High Priority
- Unit tests for components
- Integration tests for workflows
- Performance optimizations
- Accessibility improvements

### Medium Priority
- Drag-and-drop field positioning
- PDF export functionality
- Advanced search filters
- Dark mode theme

### Low Priority
- Multi-language support
- Contract templates library
- Advanced analytics dashboard
- Mobile app version

## 📞 Getting Help

If you need help:

1. Check existing [Issues](https://github.com/sonikumari255jsr-sketch/CMS_Eurusys/issues) and [Discussions](https://github.com/sonikumari255jsr-sketch/CMS_Eurusys/discussions)
2. Search the documentation
3. Ask in GitHub Discussions
4. Contact maintainers directly

## 🙏 Recognition

Contributors will be recognized in:
- GitHub repository contributors list
- CHANGELOG.md for significant contributions
- Project README acknowledgments

Thank you for contributing to the Contract Management Platform! 🚀