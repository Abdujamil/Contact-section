export function createSlug(title: string): string {
  try {
    if (!title || typeof title !== 'string') {
      console.warn('Invalid title provided to createSlug:', title);
      return '';
    }
    
    // Простая транслитерация
    const translitMap: { [key: string]: string } = {
      'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e', 'ё': 'e',
      'ж': 'zh', 'з': 'z', 'и': 'i', 'й': 'j', 'к': 'k', 'л': 'l', 'м': 'm',
      'н': 'n', 'о': 'o', 'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u',
      'ф': 'f', 'х': 'h', 'ц': 'c', 'ч': 'ch', 'ш': 'sh', 'щ': 'sch',
      'ъ': '', 'ы': 'y', 'ь': '', 'э': 'e', 'ю': 'yu', 'я': 'ya'
    };
    
    let result = title.toLowerCase().trim();
    
    // Заменяем кириллицу
    for (const [cyrillic, latin] of Object.entries(translitMap)) {
      result = result.replace(new RegExp(cyrillic, 'g'), latin);
    }
    
    // Убираем все кроме букв, цифр, пробелов и дефисов
    result = result.replace(/[^a-z0-9\s-]/g, '');
    
    // Заменяем пробелы на дефисы
    result = result.replace(/\s+/g, '-');
    
    // Убираем множественные дефисы
    result = result.replace(/-+/g, '-');
    
    // Убираем дефисы в начале и конце
    result = result.replace(/^-+|-+$/g, '');
    
    return result;
  } catch (error) {
    console.error('Error in createSlug:', error);
    return '';
  }
}