export default class Sizes
{
    constructor()
    {
        const listeners = new Set()
        this.emitter = {
            on: (_event, callback) => listeners.add(callback),
            off: (_event) => listeners.clear(),
            emit: () => listeners.forEach((callback) => callback()),
        }

        // Setup
        this.width = window.innerWidth
        this.height = window.innerHeight
        this.pixelRatio = Math.min(window.devicePixelRatio, 2)

        // Resize event
        this.handleResize = () =>
        {
            this.width = window.innerWidth
            this.height = window.innerHeight
            this.pixelRatio = Math.min(window.devicePixelRatio, 2)

            this.emitter.emit('resize')
        }
        window.addEventListener('resize', this.handleResize)
    }
}
