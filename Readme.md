# LiveSpace Virtual Environment

LiveSpace is an innovative virtual environment platform that leverages 3D spatial audio technology to create immersive experiences for users in various domains such as gaming, education, and corporate collaboration.

## Features

- **3D Spatial Audio**: Experience sound with realistic directionality and distance effects.
- **Customizable Audio Settings**: Tailor the audio experience to your preferences.
- **WebRTC Integration**: Real-time communication for creating and joining virtual rooms.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Before running the project, make sure you have Node.js and npm installed on your system. You can download and install them from [Node.js official website](https://nodejs.org/).

### Installation

To set up the LiveSpace environment on your local machine, follow these steps:

1. Unzip the downloaded project file to your desired location.
2. Open your terminal or command prompt.
3. Navigate to the project directory with `cd path/to/project`.
4. Run the command `npm install` to install all the required dependencies.

### Running the Development Server

After installing the dependencies, you can start the development server with the following command:
1. Run the command `npm run dev`
2. Open `localhost:3000` on browser to use the application

## 3 design decisions that made, as a perceptual consideration for the user

Our project involved crucial design decisions aimed at enhancing the perceptual experience for users in the virtual environment. Below are three significant decisions we made:

### 1. Distance Attenuation
- **Description**: Implemented distance attenuation to ensure that sound intensity decreases as a user moves away from the source.
- **Purpose**: This feature mimics the natural behavior of sound in real-world settings, enhancing spatial awareness and providing a realistic auditory experience that aids in navigation within the virtual environment.

### 2. Directional Audio Effects
- **Description**: Integrated directional audio effects to vary sound based on its origin relative to the user’s position.
- **Purpose**: This helps users determine the location of sound sources, significantly improving their ability to interact with and respond to different elements in the environment. It supports a more immersive experience by aligning auditory cues with visual perceptions, enhancing the overall realism of the virtual space.

### 3. Customizable Audio Settings
- **Description**: Provided a feature that allows users to adjust audio settings according to their personal preferences and needs.
- **Purpose**: This design decision enables users to tailor the auditory experience to their liking, accommodating a wide range of auditory sensitivities and preferences. It ensures that the environment is accessible and enjoyable for all users, making the virtual space more adaptable and user-friendly.
