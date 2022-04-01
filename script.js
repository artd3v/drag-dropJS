//выбор всех необходимых элементов
const dropArea = document.querySelector(".drag-area"),
dragText = dropArea.querySelector("header"),
button = dropArea.querySelector("button"),
input = dropArea.querySelector("input");
let file; //глобальная переменная

button.onclick = ()=>{
  input.click(); //если пользователь нажмет на кнопку, то сразу нажмет и ввод 

}

input.addEventListener("change", function(){
  //получаем файл который выбрал пользователь, только один он будет по этому в массиве в низу 0
  file = this.files[0];
  dropArea.classList.add("active");
  showFile(); //функция вызова
});


//При перетаскивании в зону файла, в место идущих событий по умолчанию добавляем класс active и меняем надпись
dropArea.addEventListener("dragover", (event)=>{
  event.preventDefault();
  dropArea.classList.add("active");
  dragText.textContent = "Release to Upload File";
});

//При переносе за границу  просто убираем класс активности и возвращаем изначальную надпись
dropArea.addEventListener("dragleave", ()=>{
  dropArea.classList.remove("active");
  dragText.textContent = "Drag & Drop";
});

//Если файл перетащили в зону
dropArea.addEventListener("drop", (event)=>{
  event.preventDefault(); //меняем событие по умолчанию на тот самый массив с 0 и тем самым получаем файл
  //Но только 1 даже если будет выбрано несколько мы получим самый первый
  file = event.dataTransfer.files[0];
  showFile(); //функциия вызова
});

function showFile(){
  let fileType = file.type; //получение выбранного типа файла
  let validExtensions = ["image/jpeg", "image/jpg", "image/png"]; //будем получать только изображения
  if(validExtensions.includes(fileType)){ //если выбранный файл является файлом изображения
    let fileReader = new FileReader(); //создаем объект который при загрузке будет создавать тэг img и туда в атрибут src добавлять URL
    fileReader.onload = ()=>{
      let fileURL = fileReader.result; 
      let imgTag = `<img src="${fileURL}" alt="">`;
      dropArea.innerHTML = imgTag; //И все это дело строго внутри контейнера
    }
    fileReader.readAsDataURL(file);
  }else{
    alert("This is not an Image File!");
    dropArea.classList.remove("active");
    dragText.textContent = "Drag & Drop to Upload File";
  }
}
