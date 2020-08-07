import {useState} from "react";
import {round} from "../lib";

export interface I_Timer {
    start(): void; //starts from 0;
    pause(): void;
    resume(): void;
    stop(): void;
    /**
     * getters are not active listeners, so they mostly make sense after the timer has been stopped
     */
    getMs(): number;
    getS( round?: number ): number;
}

export const useTimer = (): I_Timer => {
    /**
     * store the amount of time that has passed before being stopped by a pause or stop action
     */
    const [previouslyElapsed, setPreviouslyElapsed] = useState(0);
    /**
     * store the timestamp when the current timing was started with a resume or start action
     */
    const [since, setSince] = useState(Date.now());
    /**
     * whether the timer is currently "ticking"
     */
    const [isActive, setIsActive] = useState(true);


    /**
     * helper which returns the time elapsed in the current cycle
     */
    const elapsed = () => Date.now() - since;


    /**
     * start clears any previously stored timings and starts from 0
     */
    const start = () => {
        setPreviouslyElapsed(0);
        setSince(Date.now());
        setIsActive(true);
    };
        /**
         * pause deactivates and stores the passed time into previouslyElapsed as a fixed number
         * if ( isActive ) exists because we aren't clearing the value of since,
         * so don't want to double count the elapsed time if pause or stop are called multiple times
         */
        const pause = () => {
        if ( isActive ) {
            setPreviouslyElapsed(previouslyElapsed + elapsed());
            setIsActive(false);
        }
    };
        /**
         * resume activates the timer without resetting
         */
        const resume = () => {
        if ( ! isActive ) {
            setSince(Date.now());
            setIsActive(true);
        }
    };
        /**
         * as currently implemented, stop isn't actually different from pause
         */
        const stop = pause;

    /**
     * designed to be called after the timer is paused or stopped
     * can getMs on active timer, but the value is not continually updated
     */
    const getMs = () => {
            if ( isActive ) {
                return previouslyElapsed + elapsed();
            } else {
                return previouslyElapsed;
            }
        };

    /**
     * can return as seconds instead of milliseconds, and round to any number of places
     */
    const getS = (decimals: number = 0) => {
        return round( 1000 * getMs(), decimals );
    }

    return {
        start,
        stop,
        pause,
        resume,
        getMs,
        getS,
    }
}
