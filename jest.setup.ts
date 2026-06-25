// Angular's `@Injectable` / `@Inject` decorators emit `design:paramtypes`
// metadata via `Reflect.metadata`, which requires the `reflect-metadata`
// polyfill to exist before any decorated class is evaluated.
import "reflect-metadata";
