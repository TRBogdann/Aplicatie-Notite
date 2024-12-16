import { marked } from "https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js";


export class Page{

  #status;
  //0 new file
  //1 existing file
  btnEdit;
  btnSave;
  #form;

  #subject;
  #title;
  #tags;
  #keywords;
  #mainText;
  #parsedText;

  //for test only
  #formData;

  
  constructor(){
    this.#open();

    // this.#formData = new FormData();
    this.#status = 1;
    this.btnSave = document.getElementById("save");
    this.btnEdit = document.getElementById("edit");
    this.#form = document.getElementById("page-form");
    this.#subject = "";
    this.#title = "";
    this.#tags = [];
    this.#keywords = [];
    this.#mainText = "";
    this.parsedText= "";

    // this.open();
  }

  #readFromDB(db){}

  #open(){
    if(this.#status === 1){
      // const formData = this.#readFromDB(db);
      const formData = this.#formData;
      this.#convertFromFormData(formData);
      this.#fillIntoForm();
      this.#lockFormElms();
    }
  }

  #convertFromFormData(formData){
    for( const [key, value] of formData){
      switch(key){
        case "subject":
          this.#subject = value;
          break;
        case "title":
          this.#title = value;
          break;
        case "tags":
          this.#tags = value;
          break;
        case "keywords":
          this.#keywords = value;
          break;
        case "mainText":
          this.#mainText = value;
          break;
      }
    }
  }

  #fillIntoForm(){
    Array.from(this.#form.elements).forEach(element => {
      const { name } = element;

      if (!name) return;

      switch (name) {
          case "mainText":
              element.value = this.#mainText;
              break;
          case "tags":
              element.value = this.#tags;
              break;
          case "keywords":
              element.value = this.#keywords;
              break;
          case "title":
              element.value = this.#title;
              break;
          case "subject":
              element.value = this.#subject;
              break;
      }
    });
  }

  edit(){
    
    const formData = this.#formData;
    this.#convertFromFormData(formData);
    this.#fillIntoForm();
    this.#unlockFormElms();
    // this.#status = 1;
    // this.#open();
  }

  


  #lockFormElms(){
    Array.from(this.#form.elements).forEach(element => {
      const {name} = element
      if(name !== "editBTN")
        element.disabled = true;
    });
  }

  #unlockFormElms(){
    Array.from(this.#form.elements).forEach(element => {
      const {name} = element
      if(name !== "saveBTN")
        element.disabled = false;
    });
  }



  #validateFields(){
    let isValid = true;

    // Iterate over all elements in the form
    Array.from(this.#form.elements).forEach(element => {
        // Skip non-input elements and buttons
        if (["BUTTON", "FIELDSET"].includes(element.tagName) || element.type === "hidden") {
            return;
        }
  
        // Check if the element is required and not filled
        if (element.required && !element.value.trim()) {
            isValid = false;
  
            // Optionally, add a visual indication for invalid fields
            element.classList.add("invalid"); // Add a class for styling
        } else {
            element.classList.remove("invalid"); // Remove the class if valid
        }
    });
  
    return isValid;
  }

  

  #saveElements(){
    Array.from(this.#form.elements).forEach(element => {
      const { name, value } = element;
      if(!name || !value.trim()) { return; }
      switch(name){
        case "subject":
          this.#subject = value.trim();
          break;
        case "title":
          this.#title = value.trim();
          break;
        case "tags":
          this.#tags = value.trim();
          break;
        case "keywords":
          this.#keywords = value.trim();
          break;
        case "mainText":
          this.#mainText = value.trim();
          break;
      }
    });
  }

  save(){
    const valid = this.#validateFields();
    if(valid){
      this.#saveElements();
      this.#parseMD();
      this.#convertToFormData();
      this.#lockFormElms();
      this.#sendToDB(1);
      this.#close();
      this.#status = 1;
    }
    else{
      alert("Some fields were not filled!");
      throw new Error("Some fields were not filled!");
    }
  }

  #parseMD(){
    const mdText = marked.parse(this.#mainText);
    this.#parsedText = mdText.trim();
  }

  #convertToFormData(){
    this.#formData = new FormData(this.#form);
  }

  #sendToDB(db){}

  #close(){
    // window.location.href  ="https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js";
    window.open('http://127.0.0.1:5500', '_self');
    window.close();
  }


  
}