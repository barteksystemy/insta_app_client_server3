Przy zmianie lokalizacji plików serwera należy w fileControllerze odkomentować linijkę 14 i zobaczyć, który index ma nazwa pliku(upload_jakieśznaki).
W tej linijce poniżej pierwszy folderPath zmienić na (index_nazwypliku - 2) a wszystkie inne na index_nazwypliku
Np dla indexu pliku równego 8:
let urlPath =
folderPath[6] + "\\" + fields.album + "\\" + folderPath[8];
console.log("urlPath", urlPath);
