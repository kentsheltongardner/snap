class FPSTracker {
    constructor() {
        this.frame              = 0
        this.startTimeCycle     = performance.now()
        this.startTimeFrame     = performance.now()
        this.elapsedTimeCycle   = 0.0
        this.elapsedTimeFrame   = 0.0
        this.framesPerSecond    = 0.0
    }
    trackFPS() {
        this.frame++
        const currentTime           = performance.now()
        this.elapsedTimeFrame       = currentTime - this.startTimeFrame
        this.startTimeFrame         = currentTime
        if (this.frame % FPSMeasurementFrames === 0) {
            this.elapsedTimeCycle   = currentTime - this.startTimeCycle
            this.startTimeCycle     = currentTime
            this.framesPerSecond    = 1000 * FPSMeasurementFrames / this.elapsedTimeCycle
        }
    }
}