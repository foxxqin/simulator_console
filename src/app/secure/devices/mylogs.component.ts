import { Component, Input, OnInit, OnDestroy, ViewChild, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { DeviceService } from '../../service/device.service';
import { Router } from '@angular/router';
import { ProfileInfo } from '../../model/profileInfo';
import { Log } from '../../model/log';
import { LoggerService } from '../../service/logger.service';
import { AsyncLocalStorage } from 'angular-async-local-storage';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import * as moment from 'moment';
declare var jquery: any;
declare var $: any;
declare var swal: any;

@Component({
    selector: 'app-ratchet-my-mylogs',
    templateUrl: './mylogs.component.html'
})
export class MyLogsComponent implements OnInit { // implements LoggedInCallback {

    public title: string = 'My Logs';
    private profile: ProfileInfo;
    public logs: Log[] = [];
    
    @BlockUI() blockUI: NgBlockUI;

    constructor(public router: Router,
        private deviceService: DeviceService,
        protected localStorage: AsyncLocalStorage,
        private logger: LoggerService) {
    }

    ngOnInit() {

        this.blockUI.start('Loading devices...');

        const _self = this;

        this.localStorage.getItem<ProfileInfo>('profile').subscribe((profile) => {
            _self.profile = new ProfileInfo(profile);
            _self.loadLogs();
        });
    }

    loadLogs() {
        this.deviceService.getLogs().then((logs: Log[]) => {
            this.blockUI.stop();
            this.logs = logs;
        }).catch((err) => {
            this.blockUI.stop();
            swal(
                'Oops...',
                'Something went wrong! Unable to retrieve the logs.',
                'error');
            this.logger.error('error occurred calling getLogs api, show message');
            this.logger.error(err);
        });
    }

    refreshData() {
        this.blockUI.start('Loading logs...');
        this.loadLogs();
    }

    formatDate(dt: string) {
        return moment(dt).format('MMM Do YYYY');
    }
}
