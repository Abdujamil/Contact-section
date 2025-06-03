export function createSlug(title: string): string {
    if (!title) return '';

    return title
        .toLowerCase()
        .trim()
        // Заменяем кириллицу на латиницу (базовая транслитерация)
        .replace(/а/g, 'a').replace(/б/g, 'b').replace(/в/g, 'v').replace(/г/g, 'g')
        .replace(/д/g, 'd').replace(/е/g, 'e').replace(/ё/g, 'e').replace(/ж/g, 'zh')
        .replace(/з/g, 'z').replace(/и/g, 'i').replace(/й/g, 'j').replace(/к/g, 'k')
        .replace(/л/g, 'l').replace(/м/g, 'm').replace(/н/g, 'n').replace(/о/g, 'o')
        .replace(/п/g, 'p').replace(/р/g, 'r').replace(/с/g, 's').replace(/т/g, 't')
        .replace(/у/g, 'u').replace(/ф/g, 'f').replace(/х/g, 'h').replace(/ц/g, 'c')
        .replace(/ч/g, 'ch').replace(/ш/g, 'sh').replace(/щ/g, 'sch').replace(/ъ/g, '')
        .replace(/ы/g, 'y').replace(/ь/g, '').replace(/э/g, 'e').replace(/ю/g, 'yu')
        .replace(/я/g, 'ya')
        // Убираем все что не буквы, цифры, пробелы и дефисы
        .replace(/[^\w\s-]/g, '')
        // Заменяем пробелы и множественные дефисы на один дефис
        .replace(/[\s_-]+/g, '-')
        // Убираем дефисы в начале и конце
        .replace(/^-+|-+$/g, '');
}