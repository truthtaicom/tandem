class TandemProfileDirective {
    constructor () {
        this.restrict = 'A';
        this.transclude = true;
        this.templateUrl = 'views/tandem-data.html'; //'<span>{{tandemProfile.tandemData}}</span>';
        this.scope = {};
        this.bindToController = {
            'tandemData': '='
        };
        this.controllerAs = 'tandemProfile';
        this.controller = function (ActivitiesService, DataService) {
			this.ActivitiesService = ActivitiesService;
			this.DataService = DataService;
            this.close = function () {
                delete this.tandemData;
            };
            this.userData = localStorage.getItem('tandemApp_userData') ? JSON.parse(localStorage.getItem('tandemApp_userData')) : {
                name: '',
                email: '',
                zip: '',
                city: '',
                description: '',
                lang_have_id: this.ActivitiesService.offerId,
                lang_seek_id: this.ActivitiesService.searchId
            };
            this.myTandemForm = {};
            this.formState = {
                submitted: false,
                error: false,
                success: false
            };
            this.formData = {
                tandem_id: this.tandemData.tandem_id,
                name: this.userData.name,
                email: this.userData.email,
                text: ''
            };
            this.submitForm = () => {
                this.formState.submitted = true;
                if (this.myTandemForm.$valid) {
                    this.DataService.contactTandem(this.formData).then((returnData) => {
                        console.log('returnData : ', returnData);
                        if (returnData.data && returnData.data.toString() === 'true') {
                            this.formState.success = true;
                            this.formState.error = false;
                        } else {
                            this.formState.success = false;
                            this.formState.error = true;
                        }
                    }, () => {
                        this.formState.success = false;
                        this.formState.error = true;
                    });
                }
            };
        };
    }

    static directiveFactory (ActivitiesService, DataService) {
        TandemProfileDirective.instance = new TandemProfileDirective(ActivitiesService, DataService);
        return TandemProfileDirective.instance;
    }
}

TandemProfileDirective.$inject = ['ActivitiesService', 'DataService'];

export { TandemProfileDirective };
