import { delcan } from "../../declarations/delcan";

const initCanister = async () => {
    const principal = await delcan.init();
    console.log('Init', principal.toText());
}

const deleteCanister = async () => {
    const principal = await delcan.delete();
    console.log('Delete', principal.toText());
}

const init = () => {
    const btnInit = document.querySelector("button#init");
    btnInit.addEventListener("click", initCanister);

    const btnDelete = document.querySelector("button#delete");
    btnDelete.addEventListener("click", deleteCanister);
};

document.addEventListener("DOMContentLoaded", init);
