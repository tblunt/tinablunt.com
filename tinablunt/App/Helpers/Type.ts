/// <autosync enabled="true" />

module TinasApp {
    'use strict';

    export class Type {

        public static getName(ent: any): string {
           
            if (typeof ent == "string") return ent;

            if (ent.constructor && ent.constructor.name != "Function") {
                return ent.constructor.name || (ent.toString().match(/function (.+?)\(/) || [, ''])[1];
            } else {
                return ent.name;
            }
        }
    }
}  