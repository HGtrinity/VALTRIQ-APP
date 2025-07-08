# Valtriq App

Valtriq is a mobile application designed to streamline the documentation process for medical consultations. By leveraging audio recording and advanced AI technologies, Valtriq allows healthcare professionals to focus more on patient care and less on administrative tasks.

## Features

- **Audio Recording**: Record consultations with a single button press.
- **Automatic Transcription**: Convert recorded audio to text using OpenAI's Whisper.
- **SOAP Report Generation**: Automatically generate structured SOAP reports from transcriptions.
- **User-Friendly Interface**: Easy navigation between consultations and reports.
- **Secure Storage**: Store audio files and reports securely using Supabase.

## Project Structure

```
valtriq-app
├── src
│   ├── api
│   │   ├── openai.ts          # API layer for OpenAI services
│   │   └── supabase.ts        # API layer for Supabase services
│   ├── components
│   │   └── MedicalDocGenerator.tsx  # Custom hook for audio recording
│   ├── screens
│   │   ├── HomeScreen.tsx     # Home screen displaying consultations
│   │   └── DocScreen.tsx      # Screen for viewing and approving reports
│   ├── navigation
│   │   └── AppNavigator.tsx    # Navigation setup for the app
│   ├── utils
│   │   └── helpers.ts          # Utility functions
│   └── types
│       └── index.ts            # TypeScript types and interfaces
├── supabase
│   └── functions
│       └── process-audio
│           └── index.ts        # Edge function for processing audio
├── migrations
│   └── 001_init.sql            # SQL migration scripts for database setup
├── .env                         # Environment variables
├── package.json                 # NPM configuration file
├── tsconfig.json                # TypeScript configuration file
└── README.md                    # Project documentation
```

## Setup Instructions

1. **Clone the Repository**:
   ```
   git clone <repository-url>
   cd valtriq-app
   ```

2. **Install Dependencies**:
   ```
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env` file in the root directory and add your Supabase and OpenAI API keys:
   ```
   SUPABASE_URL=<your-supabase-url>
   SUPABASE_ANON_KEY=<your-anon-key>
   SUPABASE_SERVICE_KEY=<your-service-role-key>
   OPENAI_KEY=<your-openai-api-key>
   ```

4. **Initialize Supabase**:
   - Create a new project on Supabase.
   - Enable Storage and Edge Functions.
   - Create a bucket named `audio` (set to private).
   - Run the SQL migration script to set up the database tables.

5. **Run the Application**:
   ```
   expo start
   ```

## Usage

- Start a new consultation by pressing the "Iniciar Nova Consulta" button on the home screen.
- Record the consultation, which will be automatically uploaded for processing.
- Review the generated SOAP report and approve it to update the consultation status.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.