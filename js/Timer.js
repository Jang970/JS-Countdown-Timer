export default class Timer {
    constructor(root){

        root.innerHTML = Timer.getHTML();

        this.element = {
            minutes: root.querySelector(".timerPart--minutes"),
            seconds: root.querySelector(".timerPart--seconds"),
            control: root.querySelector(".timerButtonControl"),
            reset: root.querySelector(".timerButtonReset"),
        };

        // specify instance variables
        this.interval = null;
        this.remainingSeconds = 0;

        this.element.control.addEventListener("click", () => {

            if (this.interval === null) {
                this.start();
            } else {
                this.stop();
            }
        });

        this.element.reset.addEventListener("click", () => {

            const inputMinutes = prompt("Enter number of minutes:");

            if (inputMinutes < 60) {
                this.stop();
                this.remainingSeconds = inputMinutes * 60;
                this.updateInterfaceTime();
            }
        });
    }

    updateInterfaceTime() {
        // calculate minutes and seconds
        const minutes = Math.floor(this.remainingSeconds / 60);
        const seconds = this.remainingSeconds % 60;

        // putting into HTML
        this.element.minutes.textContent = minutes.toString().padStart(2, "0");
        this.element.seconds.textContent = seconds.toString().padStart(2, "0");
    }

    updateInterfaceControls() {

        if(this.interval === null) {
            // display start button, timer not running
            this.element.control.innerHTML = `<span class="material-icons">play_arrow</span>`;
            this.element.control.classList.add("timerButtonStart");
            this.element.control.classList.remove("timerButtonStop");
            
        } else {

            // timer is running, display pause button
            this.element.control.innerHTML = `<span class="material-icons">pause</span>`;
            this.element.control.classList.add("timerButtonStop");
            this.element.control.classList.remove("timerButtonStart");
            
        }

    }

    start() { // method to start timer

        if(this.remainingSeconds === 0) return;

        this.interval = setInterval(() => {

            this.remainingSeconds--;
            this.updateInterfaceTime();

            if(this.remainingSeconds === 0) {
                this.stop();
            }

        }, 1000);

        this.updateInterfaceControls();

    }

    stop() { // stop timer

        clearInterval(this.interval);

        this.interval = null;

        this.updateInterfaceControls();

    }

    static getHTML(){ // generating HTML string
        return `
            <!-- adding timer displays -->
            <span class="timerPart timerPart--minutes">00</span>
            <span class="timerPart">:</span>
            <span class="timerPart timerPart--seconds">00</span>
            <!-- adding buttons -->
            <button type="button" class="timerButton timerButtonControl timerButtonStart">
                <span class="material-icons">play_arrow</span>
            </button>
            <button type="button" class="timerButton timerButtonReset">
                <span class="material-icons">timer</span>
            </button>
        `;
    }
}