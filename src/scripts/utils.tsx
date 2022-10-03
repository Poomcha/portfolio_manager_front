// date parsing
const prettyDate = (date: string): string => {
    return `
            ${
                date
                .split('T')[0]
                .split('-')
                .reverse()
                .join('/')
            }
             à 
            ${
                date
                .split('T')[1]
                .split('.')[0]
                .replace(':', 'h')
                .replace(':', 'mn')
                .concat('s')
            }
        `
}

export { prettyDate }