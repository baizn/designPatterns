### DIP原则

依赖倒置原则：

- 高级模块不应当依赖于低级模块，它们都应该依赖于抽象；
- 抽象不应当依赖于实现，实现应当依赖于抽象。

DIP原则存在的意义是指，我们需要将一些对象解耦，它们的耦合关系需要达到当一个对象依赖的对象作出改变时，对象本身不需要更改任何代码。

这样的架构可以实现一种松耦合的系统，因为系统中所有的组件，彼此之间都不需要了解其他系统中组件的具体定义和实现细节，在松耦合的系统中，任何组件都可以被提供相同服务的组件所替换。

依赖倒置也有一些缺点，如需要一个用于处理依赖倒置逻辑的容器，同时，还需要进行配置。容器通常需要具备能够在系统中注入服务，这些服务需要具备正确的作用域和参数，还应当被注入正确的执行上下文。

#### Example：提供WebSocket服务

需求：将所有Websocket解决方案都抽象成一个提供Websocket连接服务的提供者，根据实际需求，使用不同的Websocket服务提供者，如Socket.io、Sockets或原生Websocket接口。

Step 1 定义接口：

```
export interface WebSocketConfiguration {
    uri: string
    options?: object
}

export interface SocketFactory {
    createSocket(configuration: WebSocketConfiguration): any
}
```

上面定义的接口中，没有提供任何的实现细节。

针对上面的接口，我们提供一个Socket.io的服务工厂：

```
import { Manager } from 'socket.io-client'

class SocketIOFactory implements SocketFactory {
    createSocket(configuration: WebSocketConfiguration): any {
        return new Manager(configuration.uri, configuration.opts)
    }
}
```

我们可以通过实现SocketFactory接口，来增加若干工厂类，只要实现这个接口即可。

再提供一个关于客户端连接实例的抽象：

```
export interface SocketClient {
    connect(configuration: WebSocketConfiguration): Promise<any>
    close(): Promise<any>
    emit(event: string, ...args: any[]): Promise<any>
    on(event: string, fn: Function): Promise<any>
}

class WebSocketClient implements SocketClient {
    private socketFactory: SocketFactory
    private socket: any
    public constructor(webSocketFactory: SocketFactory) {
        this.socketFactory = webSocketFactory
    }
    
    public connect(config: WebSocketConfiguration): Promise<any> {
        if(!this.socket) {
            this.socket = this.socketFactory.createSocket(config)
        }
        return new Promise<any>((resolve, reject) => {
            this.socket.on('connect', () => resolve())
            this.socket.on('connect_error', (error: Error) => reject(error))
        })
    }
    
    public emit(event: string, ...args: any[]): Promise<any> {
        return new Promise<string | Object>((resolve, reject) => {
            if(!this.socket) {
                return reject('No Connection)
            }
            return this.socket.emit(event, args, (response: any) => {
                if(response.error) {
                    return reject(response.error)
                }
            })
        })
    }
    
    public on(event: string, fn: Function): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            if(!this.socket) {
                return reject('No Connection)
            }
            this.socket.on(event, fn)
            resolve()
        })
    }
    
    publi close(): Promise<any> {
        return new Promise<any>((resolve) => {
            this.socket.close(() => {
                this.socket = null
                resolve()
            })
        })
    }
}
```

在上面的构造函数中，我们传入了一个类型为SocketFactory的参数，这是为了满足关于依赖倒置原则的第一条原则，对应第二条原则，我们需要一种方式来提供这个不需要了解内部实现细节、可替换的、易于配置的参数。

`Inversify`库可以帮助我们达到以上目的。

```
import { injectable, inject } from 'inversify'
const webSocketFactoryType: symbol = Symbol('webSocketFactory')
const webSocketClientType: symbol = Symbol('webSocketClient')
let TYPES: any = {
    WebSocketFactory: webSocketFactoryType,
    WebSocketClient: webSocketClientType
}

@injectable()
class SocketIOFactory implements SocketFactory {...}

@injectable()
class WebSocketClient implements SocketClient {
    public constructor(@inject(TYPES.WebSocketFactory)websocketFactory: SocketFactory) {
        this.socketFactory = websocketFactory
    }
}

```

`@injectable`和`@inject`装饰器仅仅会在代码运行时，在如何提供这些组件实例时，提供一些元数据，接下来我们需要创建一个依赖倒置容器，并将所有的对象按正确的类型绑定起来，如：

```
import { Container } from 'inversify'
import 'reflect-metadata'
import { TYPES, SocketClient, SocketFactory, SocketIOFactory, WebSocketClient } from 'xxx'
const container = new Container({
    defaultScope: 'Singleton'
})
container.bind<SocketClient>(TYPES.WebSocketClient).to(WebSocketClient)
container.bind<SocketFactory>(TYPES.WebSocketFactory).to(SocketIOFactory)
export default container
```

使用我们提供的服务，通过以下语句连接到客户端实例：

```
const socketClient = container.get<SocketClient>(TYPES.WebSocketClient)
```

