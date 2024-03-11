import {makeAutoObservable} from "mobx";

export default class OrganizationStore {
    constructor() {
        this._organizations = []
        this._selectedOrganization = {}
        makeAutoObservable(this)
    }

    setOrganizations(organizations) {
        this._organizations = organizations
    }

    setSelectedOrganization(organization) {
        this._selectedOrganization = organization
    }

    get organizations() {
        return this._organizations
    }

    get selectedOrganization() {
        return this._selectedOrganization
    }
}
