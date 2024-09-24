export class DirectionControl {
    constructor() {
        this.directionUpdate = { x: 0, y: -1 };
        this.directionEventInit();
    }
    static directionControlInstance() {
        if (!this.directionControl) {
            this.directionControl = new DirectionControl();
        }
        return this.directionControl;
    }
    directionEventInit() {
        window.addEventListener("keydown", (event) => {
            if (event.key === "ArrowUp" && this.directionUpdate.y !== 1) {
                this.directionUpdate = { x: 0, y: -1 };
            }
            if (event.key === "ArrowDown" && this.directionUpdate.y !== -1) {
                this.directionUpdate = { x: 0, y: 1 };
            }
            if (event.key === "ArrowRight" && this.directionUpdate.x !== -1) {
                this.directionUpdate = { x: 1, y: 0 };
            }
            if (event.key === "ArrowLeft" && this.directionUpdate.x !== 1) {
                this.directionUpdate = { x: -1, y: 0 };
            }
        });
    }
    getDirectionUpdate() {
        return this.directionUpdate;
    }
    resetDirectionUpdate() {
        this.directionUpdate = { x: 0, y: -1 };
    }
}
