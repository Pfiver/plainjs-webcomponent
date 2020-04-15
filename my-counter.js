class MyCounter extends HTMLElement {
  
  count = 0;

  static html = `
    <button id="dec" class="large btn">-</button>
    <span id="val"></span>
    <button id="inc" class="large btn">+</button>
  `;

  static css = `
    * {
      font-size: 200%;
    }

    span {
      width: 4rem;
      display: inline-block;
      text-align: center;
    }

    button {
      width: 4rem;
      height: 4rem;
      border: none;
      border-radius: 10px;
      background-color: seagreen;
      color: white;
    }
  `;
  
  constructor() {

    super();

    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
      <style>
        ${MyCounter.css}
      </style>
      ${MyCounter.html}
    `;

    this.buttonInc = this.shadowRoot.getElementById("inc");
    this.buttonDec = this.shadowRoot.getElementById("dec");
    this.spanValue = this.shadowRoot.getElementById("val");

    this.inc = this.inc.bind(this);
    this.dec = this.dec.bind(this);
    
    this.update();
  }

  inc() {
    this.count++;
    this.update();
  }

  dec() {
    this.count--;
    this.update();
  }

  update() {
    this.spanValue.innerText = this.count;
  }

  connectedCallback() {
    this.buttonInc.addEventListener("click", this.inc);
    this.buttonDec.addEventListener("click", this.dec);
  }

  disconnectedCallback() {
    this.buttonInc.removeEventListener("click", this.inc);
    this.buttonDec.removeEventListener("click", this.dec);
  }
}

customElements.define("my-counter", MyCounter);