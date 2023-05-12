const extColor = {
    pdf: '#eca3a3',
    xls: '#b1ce8a',
    xlsx: '#b1ce8a',
    xlsm: '#b1ce8a',
    doc: '#a9d5ee',
    docx: '#a9d5ee',
    txt: '#dcdcdc',
    zip: '#daa5f3',
    // jpg: '#dddf74',
    // jpeg: '#dddf74',
    // png: '#dddf74',
    // gif: '#dddf74',
} as const;

export type Extension = keyof typeof extColor;
export type Color = typeof extColor[Extension];

export const colorByExtention = (ext: string): Color => {
    if (ext in extColor) {
        return extColor[ext as Extension];
    } else {
        return '#dcdcdc';
    }
}
