import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'Mas Mus',
  webDir: 'www',
  server: {
    allowNavigation: [
      'http://ec2-18-202-174-189.eu-west-1.compute.amazonaws.com:8443', // Reemplaza con la URL de tu servidor
    ]
  }
};

export default config;
