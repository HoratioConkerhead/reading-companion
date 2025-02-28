# Stitched Up Interactive App - Quick Start Guide

Follow these simple steps to get your "Stitched Up" Interactive Companion up and running quickly.

## Step 1: Set Up Project Structure

1. Save the `setup-project.bat` file to the same directory where all your JavaScript files are located.
2. Double-click `setup-project.bat` to run it.
   - This will create the proper directory structure
   - Move all files to their correct locations
   - Create necessary configuration files

## Step 2: Install Node.js (if not already installed)

1. Download and install Node.js from [nodejs.org](https://nodejs.org/) (LTS version recommended)
2. Verify installation by opening a command prompt and typing:
   ```
   node --version
   npm --version
   ```
   Both commands should display version numbers if installed correctly.

## Step 3: Install Dependencies and Run the App

1. Open a command prompt in your project directory.
2. Install required packages:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm start
   ```
4. Your app should automatically open in your default browser at `http://localhost:3000`

## Step 4: Navigate the App

1. Use the tabs at the top to explore different aspects of the novel:
   - **Characters**: Browse character profiles and details
   - **Relationship Web**: View the network of character connections
   - **Timeline**: See events in chronological order
   - **Locations**: Explore important settings from the novel
   - **Map**: Visual representation of locations
   - **Plot Navigator**: Understand story structure and themes
   - **Objects**: View important items from the story
   - **Spy Encyclopedia**: Learn about spy techniques

2. Click on characters, events, locations, or objects to view more detailed information.

3. The app will automatically cross-reference selections, so if you select a character in the Relationship Web, you'll see their profile in the Characters tab.

## Troubleshooting

If you encounter issues:

1. **Module not found errors**: Make sure you've run `npm install` to install all dependencies.

2. **Component errors**: Check that all files were correctly moved to the right locations by the setup script.

3. **Blank screen or React errors**: Look at your browser's developer console for error messages that may help identify the problem.

4. **"Cannot find module" errors**: Some imports might need to be adjusted if file paths have changed. Check the import statements at the top of the component files.

Enjoy exploring the world of "Stitched Up"!