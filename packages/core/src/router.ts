import { Controller } from "./controller/controller"
import { HttpMethod } from "./httpMethod"
import { Route } from "./route/route"
const Symbol = require('es6-symbol')

/**
 * A type that we can instantiate. Returns T
 */
export type NewableType<T> = {new(...args: any[]): T}

export class Router {
    private static _instance: Router

    private controllers: {[key: string]: Controller} = {}

    private readonly SYMBOL_ID = Symbol('Id')

    private constructor() { }

    /**
     * Instance of Router
     * 
     * @readonly
     * @static
     * @type {Router}
     * @memberOf Router
     */
    public static get instance(): Router {
        return this._instance || (this._instance = new this())
    }

    public getControllers() {
        return this.controllers
    }

    private getKey() {
        return Symbol('controller_key')
    }

    public registerController<T extends Function>(instanceType: NewableType<T>, basePath?: string) {
        let key = instanceType.prototype[this.SYMBOL_ID] || this.getKey()
        if (this.controllers[key] != null) {
            let controller = this.controllers[key]
            controller.BasePath = basePath
            controller.Instance = new (instanceType)()
        }
    }

    public registerRoute(targetPrototype: any, httpMethod: HttpMethod, path: string, actionKey: string) {
        let key = targetPrototype[this.SYMBOL_ID] = targetPrototype[this.SYMBOL_ID] || this.getKey()
        if (this.controllers[key] == null) this.controllers[key] = new Controller()
        this.controllers[key].addRoute(new Route(httpMethod, path, actionKey))
    }
}