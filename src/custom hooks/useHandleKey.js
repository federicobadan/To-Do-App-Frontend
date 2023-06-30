import {useEffect} from 'react';


export default function useHandleKey (key, eventListenerAction, dependency, handleFunction, ref){
    useEffect(() => {
        const element = ref.current;
        const listener = (event) => {
            if(event.key===key){
                event.preventDefault();
                handleFunction();
            }
        }
        element.addEventListener(eventListenerAction, listener);
        return () => {
            element.removeEventListener(eventListenerAction, listener);
          };
      }, dependency);

}