import {Express} from "express"
import { Router } from "./router"
import { Route } from "./route/route"
import { Controller } from "./controller/controller"
import { HttpMethod } from "./httpMethod"

export abstract class Curio {
    static start(app: Express) {
        let controllers = Router.instance.getControllers()
        for (let key of Object.keys(controllers)) {
            this.bindController(app, controllers[key])
        }
    }

    private static bindController(app: Express, controller: Controller) {
        for (let route of controller.Routes) {
            this.bindRoute(app, route, controller)
        }
    }

    private static fixPath(path: string) {
        if (path.lastIndexOf('/', 0) !== 0) path = `/${path}`
        if (path.lastIndexOf('/') === path.length - 1) path = path.slice(0, -1)
        return path
    }

    private static bindRoute(app: Express, route: Route, controller: Controller) {
        let action = HttpMethod[route.Method].toLowerCase()
        let path = `${Curio.fixPath(controller.BasePath || '')}${Curio.fixPath(route.Path)}`
        //@ts-ignore
        app[action](path, controller.Instance[route.Action])
    }
}