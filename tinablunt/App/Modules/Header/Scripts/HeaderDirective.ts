/// <autosync enabled="true" />
module TinasApp {
    'use strict';

    export interface IHeaderDirectiveScope extends ng.IScope {
        navItemData: any;
        selectedView: string;
        navitemClicked: (navitem: any) => void;
        navSubitemClick: (navitem: any, navsubitem: any) => void;
        isActiveNavItem: (navitemid: any) => void; 
        isActiveNavSubItem: (navitemid: any) => void; 
    }

    export class HeaderDirective extends BaseDirective<IHeaderDirectiveScope> {

        constructor() {
            super();

            this.scope = { selectedView: '=' };
            this.restrict = 'E';
            this.templateUrl = 'App/Modules/Header/Templates/Header.html';
        }

        public initialize(scope: IHeaderDirectiveScope, element: JQuery, attributes: ng.IAttributes): void {

            scope.navItemData = this.getHeaderNavItemData();
            scope.navitemClicked = (navitem: any) => this.navitemClicked(navitem, scope);
            scope.isActiveNavItem = (navitemid: any) => this.isActiveNavItem(navitemid, scope);
            scope.isActiveNavSubItem = (navitemid: any) => this.isActiveNavSubItem(navitemid, scope);
            scope.navSubitemClick = (subitem: any, navitem: any) => this.navSubitemClick(subitem, navitem, scope);
        }

        private isActiveNavItem(navitemid: string, scope: IHeaderDirectiveScope) {
            
            var temp = scope.selectedView.indexOf(navitemid) > -1;
            return temp;
        }

        private isActiveNavSubItem(subnavitemid: string, scope: IHeaderDirectiveScope) {
            
            var temp = scope.selectedView.indexOf(subnavitemid) > -1;
            return temp;
        }

        private navitemClicked(navitem: any, scope: IHeaderDirectiveScope) {
            
            var temp = (scope.selectedView.indexOf(navitem.id) > -1) ? null : navitem.id;

            if (temp) {
                if (navitem.subviews) {
                    temp += "/" + navitem.subviews[0].id;
                }
            }

            var msg = new SetSelectedView(temp);
            Mediator.publish(msg);
        }

        private navSubitemClick(navsubitem: any, navitem: any, scope: IHeaderDirectiveScope) {
            // var temp = (navsubitem.id != scope.selectedView) ? navsubitem.id : null;
            var temp = navitem.id + "/" + navsubitem.id;

            var msg = new SetSelectedView(temp);
            Mediator.publish(msg);
        }

        private getHeaderNavItemData() {
            return [
                {
                    "title": "Hej!",
                    "icon": "welcome",
                    "color": "turkois",
                    "id": "Hej"
                },
                {
                    "title": "Kreativ abstinens",
                    "icon": "creative",
                    "color": "green",
                    "id": "Creative",
                    "subviews": [{
                        "title": "Kläder",
                        "icon": "clothes",
                        "id": "Clothes"
                    },
                        {
                            "title": "Recept",
                            "icon": "food",
                            "id": "Recept"
                        }]
                },
                {
                    "title": "Portfolio",
                    "icon": "portfolio2",
                    "color": "orange",
                    "id": "Portfolio",
                    "subviews": [
                        {
                            "title": "Karriären",
                            "icon": "project",
                            "id": "CareerLog"
                        },
                        {
                        "title": "CV",
                        "icon": "cv",
                        "id": "CV"
                    },                        
                        {
                            "title": "Utbildning",
                            "icon": "study",
                            "id": "Education"
                        }
                    ]
                },
                {
                    "title": "Socialiteter",
                    "icon": "social",
                    "color": "red",
                    "id": "Social"
                }
            ]
        }

    }
}  