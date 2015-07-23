/// <autosync enabled="true" />

module TinasApp {
    'use strict';

    export class SetSelectedView implements IMessage {

        constructor(public view: string) {
        }
    }
}       