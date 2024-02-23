import fsextra from "fs-extra";
import fs from "fs";

export async function generateLSText(path) {
    const files = fs.readdirSync(path);
    let text = "";
    for (let file = 0; file < files.length; file++) {
        text += `${files[file]}\n`
    }
    return text
}

export async function textToFile(text, name){
    fsextra.ensureFileSync(`resources/containers/${name}.txt`);
    const file = `resources/containers/${name}.txt`;
    fs.writeFileSync(file, text);
    return file;
}