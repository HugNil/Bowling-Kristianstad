export const pricingData = {
  sv: [
    {
      id: '1',
      name: 'Förmiddag',
      description: 'Måndag - Fredag före kl 16.00',
      price: 180,
      duration: 'per timme'
    },
    {
      id: '2',
      name: 'Eftermiddag',
      description: 'Måndag - Fredag mellan kl 16.00 - 18.00',
      price: 200,
      duration: 'per timme'
    },
    {
      id: '3',
      name: 'Kväll',
      description: 'Måndag - Torsdag efter kl 18.00',
      price: 240,
      duration: 'per timme'
    },
    {
      id: '4',
      name: 'Helg',
      description: 'Lördag - Söndag före kl 18.00',
      price: 240,
      duration: 'per timme'
    },
    {
      id: '5',
      name: 'Helg',
      description: 'Fredag - Lördag efter kl 18.00',
      price: 275,
      duration: 'per timme'
    },
    {
      id: '6',
      name: 'Skolor',
      description: 'Vardagar före kl 16.00',
      price: 140,
      duration: 'per timme, minst 5 banor för bokning utanför öppettider'
    }
  ],
  en: [
    {
      id: '1',
      name: 'Morning',
      description: 'Monday - Friday before 4 PM',
      price: 180,
      duration: 'per hour'
    },
    {
      id: '2',
      name: 'Afternoon',
      description: 'Monday - Friday between 4 PM - 6 PM',
      price: 200,
      duration: 'per hour'
    },
    {
      id: '3',
      name: 'Evening',
      description: 'Monday - Thursday after 6 PM',
      price: 240,
      duration: 'per hour'
    },
    {
      id: '4',
      name: 'Weekend',
      description: 'Saturday - Sunday before 6 PM',
      price: 240,
      duration: 'per hour'
    },
    {
      id: '5',
      name: 'Weekend',
      description: 'Friday - Saturday after 6 PM',
      price: 275,
      duration: 'per hour'
    },
    {
      id: '6',
      name: 'Schools',
      description: 'Weekdays before 4 PM',
      price: 140,
      duration: 'per hour, minimum 5 lanes for booking outside opening hours'
    }
  ]
};

export function getPricing(lang: "sv" | "en") {
  return pricingData[lang];
}
