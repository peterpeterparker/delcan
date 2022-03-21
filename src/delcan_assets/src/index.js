import { delcan } from "../../declarations/delcan";

const initCanister = async () => {
    try {
        const principal = await delcan.init();
        console.log('Init', principal.toText());
    } catch (err) {
        console.error(err);
    }
}

const deleteCanister = async () => {
    try {
        const principal = await delcan.delete();
        console.log('Delete', principal.toText());
    } catch (err) {
        console.error(err);
    }
}

const init = () => {
    const btnInit = document.querySelector("button#init");
    btnInit.addEventListener("click", initCanister);

    const btnDelete = document.querySelector("button#delete");
    btnDelete.addEventListener("click", deleteCanister);
};

document.addEventListener("DOMContentLoaded", init);
