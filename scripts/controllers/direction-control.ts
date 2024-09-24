import { ISnakeItem } from "../models/interfaces/snakeItem";

export class DirectionControl {
    private directionUpdate: ISnakeItem = {x: 0, y: -1}
    private static directionControl: DirectionControl

    private constructor() {
        this.directionEventInit()
    }

    static directionControlInstance(): DirectionControl {
        if (!this.directionControl) {
            this.directionControl = new DirectionControl()
        }

        return this.directionControl
    }

    directionEventInit(): void {
        window.addEventListener("keydown",(event) => {
            if (event.key === "ArrowUp" && this.directionUpdate.y !== 1) {
                this.directionUpdate = {x: 0, y: -1}
            }
            if (event.key === "ArrowDown" && this.directionUpdate.y !== -1) {
                this.directionUpdate = {x: 0, y: 1}
            }
            if (event.key === "ArrowRight" && this.directionUpdate.x !== -1) {
                this.directionUpdate = {x: 1, y: 0}
            }
            if (event.key === "ArrowLeft" && this.directionUpdate.x !== 1) {
                this.directionUpdate = {x: -1, y: 0}
            }
        })
    }

    getDirectionUpdate(): ISnakeItem {
        return this.directionUpdate
    }

    resetDirectionUpdate(): void {
        this.directionUpdate = {x: 0, y: -1}
    }
}