// Habit categories with icons and colors
export const CATEGORIES = {
    health: {
        id: 'health',
        name: 'Saúde',
        icon: 'Heart',
        color: '#4CAF50',
        description: 'Hábitos de saúde e bem-estar'
    },
    fitness: {
        id: 'fitness',
        name: 'Fitness',
        icon: 'Dumbbell',
        color: '#FF5722',
        description: 'Exercícios e atividades físicas'
    },
    mindfulness: {
        id: 'mindfulness',
        name: 'Mindfulness',
        icon: 'Brain',
        color: '#9C27B0',
        description: 'Meditação e saúde mental'
    },
    productivity: {
        id: 'productivity',
        name: 'Produtividade',
        icon: 'Target',
        color: '#2196F3',
        description: 'Foco e organização'
    },
    relationship: {
        id: 'relationship',
        name: 'Relacionamento',
        icon: 'Heart',
        color: '#E91E63',
        description: 'Conexão com seu par'
    },
    finance: {
        id: 'finance',
        name: 'Finanças',
        icon: 'PiggyBank',
        color: '#FFC107',
        description: 'Economia e controle financeiro'
    },
    learning: {
        id: 'learning',
        name: 'Aprendizado',
        icon: 'BookOpen',
        color: '#00BCD4',
        description: 'Estudos e desenvolvimento pessoal'
    },
    sleep: {
        id: 'sleep',
        name: 'Sono',
        icon: 'Moon',
        color: '#673AB7',
        description: 'Qualidade do sono'
    },
    hydration: {
        id: 'hydration',
        name: 'Hidratação',
        icon: 'Droplets',
        color: '#03A9F4',
        description: 'Consumo de água'
    }
}

// Default habits suggestions
export const DEFAULT_HABITS = [
    {
        name: 'Beber 2L de água',
        category: 'hydration',
        icon: 'Droplets',
        frequency: 'daily'
    },
    {
        name: 'Treinar 30 minutos',
        category: 'fitness',
        icon: 'Dumbbell',
        frequency: 'daily'
    },
    {
        name: 'Meditar 10 minutos',
        category: 'mindfulness',
        icon: 'Brain',
        frequency: 'daily'
    },
    {
        name: 'Ler 20 páginas',
        category: 'learning',
        icon: 'BookOpen',
        frequency: 'daily'
    },
    {
        name: 'Dormir 8 horas',
        category: 'sleep',
        icon: 'Moon',
        frequency: 'daily'
    },
    {
        name: 'Mensagem de gratidão',
        category: 'relationship',
        icon: 'Heart',
        frequency: 'daily'
    },
    {
        name: 'Caminhar 30 minutos',
        category: 'fitness',
        icon: 'Footprints',
        frequency: 'daily'
    },
    {
        name: 'Economizar R$10',
        category: 'finance',
        icon: 'PiggyBank',
        frequency: 'daily'
    }
]

// Badges/Achievements
export const BADGES = [
    {
        id: 'first_step',
        name: 'Primeiro Passo',
        icon: '🌱',
        description: 'Complete seu primeiro hábito',
        condition: { type: 'total_completions', value: 1 }
    },
    {
        id: 'on_fire',
        name: 'Em Chamas',
        icon: '🔥',
        description: '7 dias seguidos de streak',
        condition: { type: 'streak', value: 7 }
    },
    {
        id: 'consistent',
        name: 'Consistente',
        icon: '💪',
        description: '30 dias de streak',
        condition: { type: 'streak', value: 30 }
    },
    {
        id: 'together',
        name: 'Juntos',
        icon: '💕',
        description: 'Complete um hábito de casal',
        condition: { type: 'couple_habit', value: 1 }
    },
    {
        id: 'power_couple',
        name: 'Power Couple',
        icon: '🌟',
        description: '7 dias de streak de casal',
        condition: { type: 'couple_streak', value: 7 }
    },
    {
        id: 'week_warrior',
        name: 'Guerreiro da Semana',
        icon: '⚔️',
        description: 'Complete todos os hábitos por 7 dias',
        condition: { type: 'perfect_week', value: 1 }
    },
    {
        id: 'hydrated',
        name: 'Hidratado',
        icon: '💧',
        description: '7 dias de hidratação',
        condition: { type: 'category_streak', category: 'hydration', value: 7 }
    },
    {
        id: 'fitness_master',
        name: 'Mestre Fitness',
        icon: '🏋️',
        description: '30 treinos completados',
        condition: { type: 'category_total', category: 'fitness', value: 30 }
    }
]

// Motivational quotes
export const QUOTES = [
    "Juntos somos mais fortes 💪",
    "Pequenos passos, grandes conquistas 🎯",
    "O amor se constrói a cada dia 💕",
    "Vocês são um time imbatível! 🏆",
    "Consistência é a chave do sucesso 🔑",
    "Celebrem cada vitória juntos 🎉",
    "O progresso é mais importante que a perfeição ✨",
    "Cada dia é uma nova oportunidade 🌅"
]
