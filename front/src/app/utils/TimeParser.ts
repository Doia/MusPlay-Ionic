export class TimeParser {
  
    public parseTime(createdAt: Date | undefined): string {

        if (createdAt === undefined || createdAt === null){
            return '';
        }

        // Convertir a objeto Date si createdAt es una cadena
        const createdAtDate = typeof createdAt === 'string' ? new Date(createdAt) : createdAt;

        // Verificar que la fecha es válida
        if (isNaN(createdAtDate.getTime())) {
            return '';
        }

        const now = new Date();
        const diff = Math.abs(now.getTime() - createdAtDate.getTime());

        const seconds = Math.floor(diff / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        const weeks = Math.floor(days / 7);
        const months = Math.floor(weeks / 4.35); // Aproximadamente 4.35 semanas en un mes
        const years = Math.floor(months / 12);

        if (years > 0) {
        return `hace ${years} ${years === 1 ? 'año' : 'años'}`;
        } else if (months > 0) {
        return `hace ${months} ${months === 1 ? 'mes' : 'meses'}`;
        } else if (weeks > 0) {
        return `hace ${weeks} ${weeks === 1 ? 'semana' : 'semanas'}`;
        } else if (days > 0) {
        return `hace ${days} ${days === 1 ? 'día' : 'días'}`;
        } else if (hours > 0) {
        return `hace ${hours} ${hours === 1 ? 'hora' : 'horas'}`;
        } else if (minutes > 0) {
        return `hace ${minutes} ${minutes === 1 ? 'minuto' : 'minutos'}`;
        } else {
        return `hace ${seconds} ${seconds === 1 ? 'segundo' : 'segundos'}`;
        }
    }
  }