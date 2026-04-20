// Stängda datum (separerade i kategorier för enkel redigering)
//const FIXED_HOLIDAYS = [
  //'04-18', // Långfredagen
  //'04-20', // Påskdagen
  //'04-21', // Annandag påsk
  //'05-29', // Kristi himmelsfärdsdag
  //'06-20', // Midsommarafton
  //'06-21', // Midsommardagen
//];

const RECURRING_HOLIDAYS = [
  '12-23', // Lilljulafton
  '12-24', // Julafton
  '12-25', // Juldagen
  '12-26', // Annandag jul
  '12-31', // Nyårsafton
  '01-01', // Nyårsdagen
  '01-06', // Trettondagen
  '05-01', // Första maj
  '06-06', // Nationaldagen
];

const SUMMER_BREAK = [
  '6-6','6-7','6-8','6-9','6-10','6-11','6-12','6-13','6-14','6-15','6-16','6-17','6-18','6-19','6-20','6-21','6-22','6-23','6-24','6-25','6-26','6-27','6-28','6-29','6-30',
  '7-1','7-2','7-3','7-4','7-5','7-6','7-7','7-8','7-9','7-10','7-11','7-12','7-13','7-14','7-15','7-16','7-17','7-18','7-19','7-20','7-21','7-22','7-23','7-24','7-25','7-26','7-27','7-28','7-29','7-30','7-31',
  '8-1','8-2','8-3','8-4','8-5','8-6','8-7','8-8','8-9','8-10','8-11',
];

// Samlad lista utan duplicat
//const closedDates = Array.from(new Set([...FIXED_HOLIDAYS, ...RECURRING_HOLIDAYS, ...SUMMER_BREAK]));
const closedDates = Array.from(new Set([...RECURRING_HOLIDAYS, ...SUMMER_BREAK]));

export const hoursData = {
  sv: [
    { id: '1', day: 'Måndag', hours: '09:30 - 20:00', isOpen: true, closedDate: undefined as string | undefined },
    { id: '2', day: 'Tisdag', hours: '11:00 - 20:00', isOpen: true, closedDate: undefined as string | undefined },
    { id: '3', day: 'Onsdag', hours: '09:30 - 20:00', isOpen: true, closedDate: undefined as string | undefined },
    { id: '4', day: 'Torsdag', hours: '11:00 - 20:00', isOpen: true, closedDate: undefined as string | undefined },
    { id: '5', day: 'Fredag', hours: '14:00 - 19:00', isOpen: true, closedDate: undefined as string | undefined },
    { id: '6', day: 'Lördag', hours: '13:00 - 19:00', isOpen: true, closedDate: undefined as string | undefined },
    { id: '7', day: 'Söndag', hours: '13:00 - 18:00', isOpen: true, closedDate: undefined as string | undefined },
  ],
  en: [
    { id: '1', day: 'Monday', hours: '09:30 - 20:00', isOpen: true, closedDate: undefined as string | undefined },
    { id: '2', day: 'Tuesday', hours: '11:00 - 20:00', isOpen: true, closedDate: undefined as string | undefined },
    { id: '3', day: 'Wednesday', hours: '09:30 - 20:00', isOpen: true, closedDate: undefined as string | undefined },
    { id: '4', day: 'Thursday', hours: '11:00 - 20:00', isOpen: true, closedDate: undefined as string | undefined },
    { id: '5', day: 'Friday', hours: '14:00 - 19:00', isOpen: true, closedDate: undefined as string | undefined },
    { id: '6', day: 'Saturday', hours: '13:00 - 19:00', isOpen: true, closedDate: undefined as string | undefined },
    { id: '7', day: 'Sunday', hours: '13:00 - 18:00', isOpen: true, closedDate: undefined as string | undefined },
  ]
};

// Normalize date strings to YYYY-MM-DD
function normalizeDateString(raw: string): string {
  if (/^\d{4}-\d{2}-\d{2}$/.test(raw)) return raw; // already YYYY-MM-DD
  if (/^\d{2}-\d{2}$/.test(raw)) {
    const year = new Date().getFullYear();
    return `${year}-${raw}`;
  }
  return raw; // fallback: use as is
}

// Check if a specific date is closed
function isClosedDate(date: Date): boolean {
  const dateString = date.toISOString().split('T')[0];
  const normalizedClosed = closedDates.map(normalizeDateString);
  return normalizedClosed.includes(dateString);
}

// Format date
function formatDate(date: Date, lang: "sv" | "en"): string {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  
  if (lang === "sv") {
    return `${day}/${month}`;
  } else {
    return `${month}/${day}`;
  }
}

export function getOpeningHours(lang: "sv" | "en") {
  const hours = hoursData[lang].map(h => ({ ...h }));
  const today = new Date();
  
  // Check the next 7 days for closed dates
  for (let i = 0; i < 7; i++) {
    const checkDate = new Date(today);
    checkDate.setDate(today.getDate() + i);
    
    if (isClosedDate(checkDate)) {
      const dayIndex = checkDate.getDay(); // 0 = Sunday, 1 = Monday, etc.
      const adjustedIndex = dayIndex === 0 ? 6 : dayIndex - 1; // Convert to our index (0 = Monday)
      
      // Set the day to closed and add the date
      hours[adjustedIndex] = {
        ...hours[adjustedIndex],
        isOpen: false,
        closedDate: formatDate(checkDate, lang)
      };
    }
  }
  
  return hours;
}
