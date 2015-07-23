module TinasApp {
    'use strict';

    export class Mediator {

        //////////////////////////////////////////////////////////////////////
        // Storage for topics that can be broadcast or listened to
        //////////////////////////////////////////////////////////////////////
        private static messages: { [name: string]: Array<(instance: IMessage) => void> } = {};


        //////////////////////////////////////////////////////////////////////
        // Subscribe to a topic, supply a callback to be executed
        // when that topic is broadcast to
        //////////////////////////////////////////////////////////////////////
        public static subscribe(message: IMessage, fn: (instance: IMessage) => void) {

            var name = Type.getName(message);

            if (!this.messages[name]) {
                this.messages[name] = new Array<(instance: IMessage) => void>();
            }

            this.messages[name].push(fn);

        }

        //////////////////////////////////////////////////////////////////////
        // Publish/broadcast an event to the rest of the application
        //////////////////////////////////////////////////////////////////////
        public static publish(instance: IMessage) {
            var name = Type.getName(instance.constructor);

            if (!this.messages[name]) {
                return false;
            }
            _.forEach(this.messages[name],(iterator) => iterator(instance));
        }
    }
} 