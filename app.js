const snippets = {};

const sections = {
  overview: {
    title: { hu: "Áttekintés", en: "Overview" },
    html: ({lang}) => `
      <div class="hero">
        <div class="card">
          <div class="kicker">01</div>
          <h3>${lang === "hu" ? "Mit fogunk felépíteni?" : "What are we building?"}</h3>
          <p>${lang === "hu"
            ? "Egy ASP.NET Core REST API-t, amely ügyfeleket, rendeléseket és rendelési tételeket kezel EF Core + SQLite segítségével. A cél nem egyetlen óriási Controller, hanem egy jól szétválasztott réteges backend."
            : "An ASP.NET Core REST API that manages customers, orders and order items using EF Core + SQLite. The goal is not one giant controller, but a clean layered backend."}</p>
          <div class="flow">
            <div class="node">HTTP</div><div class="arrow">→</div>
            <div class="node">Controller</div><div class="arrow">→</div>
            <div class="node">Service</div><div class="arrow">→</div>
            <div class="node">Repository</div><div class="arrow">→</div>
            <div class="node">DbContext</div>
          </div>
        </div>
        <div class="card">
          <h3>${lang === "hu" ? "Domain" : "Domain"}</h3>
          <div class="grid-2">
            <div class="callout"><span class="tag">Entity</span><b>Customer</b><br><span>${lang === "hu" ? "Egy ügyfélhez több rendelés tartozhat." : "A customer can have many orders."}</span></div>
            <div class="callout"><span class="tag">Entity</span><b>Order</b><br><span>${lang === "hu" ? "Egy rendelés több tételből áll." : "An order contains many items."}</span></div>
            <div class="callout"><span class="tag green">Entity</span><b>OrderItem</b><br><span>${lang === "hu" ? "Termék, mennyiség, egységár." : "Product, quantity, unit price."}</span></div>
            <div class="callout"><span class="tag yellow">API</span><b>/api/orders</b><br><span>${lang === "hu" ? "CRUD végpontok a rendelésekről." : "CRUD endpoints for orders."}</span></div>
          </div>
        </div>
      </div>
      <div class="card">
        <h3>${lang === "hu" ? "Rétegek szerepe" : "Role of each layer"}</h3>
        <table class="endpoint-table">
          <thead><tr><th>${lang==="hu"?"Komponens":"Component"}</th><th>${lang==="hu"?"Feladata":"Responsibility"}</th><th>${lang==="hu"?"Tipikus lifetime":"Typical lifetime"}</th></tr></thead>
          <tbody>
            <tr><td><b>Controller</b></td><td>${lang==="hu"?"HTTP request/response, route-ok, státuszkódok. Üzleti logikát lehetőleg ne ide tegyünk.":"HTTP request/response, routing and status codes. Keep business logic out when possible."}</td><td>${lang==="hu"?"Framework kezeli":"Framework-managed"}</td></tr>
            <tr><td><b>Service</b></td><td>${lang==="hu"?"Üzleti szabályok, tranzakciós folyamatok, domain műveletek.":"Business rules, transaction workflows and domain operations."}</td><td><b>Scoped</b></td></tr>
            <tr><td><b>Repository</b></td><td>${lang==="hu"?"Adatbázis-lekérdezések és persistence.":"Database queries and persistence."}</td><td><b>Scoped</b></td></tr>
            <tr><td><b>DbContext</b></td><td>${lang==="hu"?"EF Core unit-of-work / change tracking / adatbázis kapcsolat kezelése.":"EF Core unit-of-work, change tracking and database access."}</td><td><b>Scoped</b></td></tr>
          </tbody>
        </table>
      </div>
      <div class="note green">${lang==="hu"
        ? "<b>Tanulási stratégia:</b> minden tab után legyen egy működőbb réteged. Először a projekt és az adatmodell álljon össze, majd erre építsük rá a persistence, business és HTTP réteget."
        : "<b>Learning strategy:</b> after each tab you should have one more working layer. Start with the project and data model, then add persistence, business logic and HTTP."}</div>
      ${navButtons("overview",lang)}
    `
  },

  project: {
    title: { hu: "Projektstruktúra", en: "Project structure" },
    html: ({lang}) => `
      <div class="card">
        <div class="kicker">02</div>
        <h3>${lang==="hu"?"Ajánlott modern struktúra":"Recommended modern structure"}</h3>
        <p>${lang==="hu"?"Egy kisebb projektnél ez még egyetlen projectben is kezelhető. Ha nő a rendszer, könnyen szétbontható külön Application/Infrastructure/WebApi projektekre. Most tanulási céllal egyetlen Web API projektet használunk.":"For a small project this can live in one project. As the system grows, the layers can be split into Application/Infrastructure/WebApi projects. For learning, we keep one Web API project."}</p>
        <div class="structure"><div class="tree"><span class="folder">OrdersApi/</span>
  <span class="folder">├── Controllers/</span>
  <span class="file">│   └── OrdersController.cs</span>
  <span class="folder">├── Data/</span>
  <span class="file">│   └── AppDbContext.cs</span>
  <span class="folder">├── Entities/</span>
  <span class="file">│   ├── Customer.cs</span>
  <span class="file">│   ├── Order.cs</span>
  <span class="file">│   └── OrderItem.cs</span>
  <span class="folder">├── DTOs/</span>
  <span class="file">│   ├── OrderDtos.cs</span>
  <span class="file">│   └── CustomerDtos.cs</span>
  <span class="folder">├── Repositories/</span>
  <span class="file">│   ├── IOrderRepository.cs</span>
  <span class="file">│   └── OrderRepository.cs</span>
  <span class="folder">├── Services/</span>
  <span class="file">│   ├── IOrderService.cs</span>
  <span class="file">│   └── OrderService.cs</span>
  <span class="folder">├── Configuration/</span>
  <span class="file">│   └── ApiSettings.cs</span>
  <span class="file">├── Migrations/        <span style="color:#73809b"># Generated by EF</span></span>
  <span class="file">├── Program.cs</span>
  <span class="file">├── appsettings.json</span>
  <span class="file">└── OrdersApi.csproj</span></div></div>
      </div>
      <div class="grid-3">
        <div class="card"><h3>Web/API</h3><p>${lang==="hu"?"Controller + HTTP-specifikus DTO-k.":"Controllers + HTTP-specific DTOs."}</p></div>
        <div class="card"><h3>Application</h3><p>${lang==="hu"?"Service + üzleti folyamatok.":"Services + business workflows."}</p></div>
        <div class="card"><h3>Infrastructure</h3><p>${lang==="hu"?"Repository + EF Core + database.":"Repositories + EF Core + database."}</p></div>
      </div>
      <div class="note">${lang==="hu"
        ? "<b>Ne keverd:</b> az Entity és a DTO nem ugyanaz. Az Entity az adatbázis/domain modellje, a DTO az API szerződésének része."
        : "<b>Don't mix them:</b> an Entity and a DTO are not the same. The Entity is your persistence/domain model; the DTO is part of the API contract."}</div>
      ${navButtons("project",lang)}
    `
  },

  setup: {
    title: { hu: "Projekt létrehozása", en: "Create the project" },
    html: ({lang}) => `
      <div class="card">
        <div class="kicker">03</div>
        <h3>${lang==="hu"?"1. Hozd létre az ASP.NET Core Web API-t":"1. Create the ASP.NET Core Web API"}</h3>
        ${code("terminal", `dotnet new webapi -n OrdersApi --framework net10.0
cd OrdersApi`)}

        <h3 style="margin-top:18px">${lang==="hu"?"2. Add EF Core + SQLite":"2. Add EF Core + SQLite"}</h3>
        ${code("terminal", `dotnet add package Microsoft.EntityFrameworkCore.Sqlite
dotnet add package Microsoft.EntityFrameworkCore.Design`)}

        <h3 style="margin-top:18px">${lang==="hu"?"3. Könyvtárak":"3. Create folders"}</h3>
        ${code("terminal", `mkdir Controllers
mkdir Data
mkdir Entities
mkdir DTOs
mkdir Repositories
mkdir Services
mkdir Configuration`)}

        <div class="note green">${lang==="hu"
          ? "<b>Miért SQLite?</b> Fejlesztéshez egyszerű: nem kell külön SQL szervert feltenned. Később a provider lecserélhető SQL Serverre vagy PostgreSQL-re."
          : "<b>Why SQLite?</b> It is simple for development: no separate SQL server is required. Later you can replace the provider with SQL Server or PostgreSQL."}</div>
      </div>
      <div class="card">
        <h3>${lang==="hu"?"Elérhető végpontok, amelyeket a végére elkészítünk":"Endpoints we will have by the end"}</h3>
        <table class="endpoint-table">
          <thead><tr><th>Method</th><th>Route</th><th>${lang==="hu"?"Mit csinál":"Purpose"}</th></tr></thead>
          <tbody>
            <tr><td><span class="method post">POST</span></td><td>/api/orders</td><td>${lang==="hu"?"Új rendelés":"Create an order"}</td></tr>
            <tr><td><span class="method get">GET</span></td><td>/api/orders</td><td>${lang==="hu"?"Összes rendelés":"List orders"}</td></tr>
            <tr><td><span class="method get">GET</span></td><td>/api/orders/{id}</td><td>${lang==="hu"?"Egy rendelés":"Get one order"}</td></tr>
            <tr><td><span class="method put">PUT</span></td><td>/api/orders/{id}</td><td>${lang==="hu"?"Módosítás":"Update"}</td></tr>
            <tr><td><span class="method delete">DELETE</span></td><td>/api/orders/{id}</td><td>${lang==="hu"?"Törlés":"Delete"}</td></tr>
          </tbody>
        </table>
      </div>
      ${navButtons("setup",lang)}
    `
  },

  entities: {
    title: { hu: "Entity-k", en: "Entities" },
    html: ({lang}) => `
      <div class="card">
        <div class="kicker">04</div>
        <h3>${lang==="hu"?"Adatmodell: Customer → Orders → OrderItems":"Data model: Customer → Orders → OrderItems"}</h3>
        <p>${lang==="hu"?"Így lesz valódi kapcsolatunk több táblán keresztül: egy Customer több Ordert tartalmaz, egy Order pedig több OrderItemet.":"This gives us real relationships across multiple tables: one Customer has many Orders, and one Order has many OrderItems."}</p>
        ${code("Entities/Customer.cs", `namespace OrdersApi.Entities;

public class Customer
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;

    public ICollection<Order> Orders { get; set; } = new List<Order>();
}`)}
        ${code("Entities/Order.cs", `namespace OrdersApi.Entities;

public class Order
{
    public int Id { get; set; }
    public DateTime CreatedAtUtc { get; set; }
    public string Status { get; set; } = "Pending";

    public int CustomerId { get; set; }
    public Customer Customer { get; set; } = null!;

    public ICollection<OrderItem> Items { get; set; } = new List<OrderItem>();
}`)}
        ${code("Entities/OrderItem.cs", `namespace OrdersApi.Entities;

public class OrderItem
{
    public int Id { get; set; }

    public string ProductName { get; set; } = string.Empty;
    public int Quantity { get; set; }
    public decimal UnitPrice { get; set; }

    public int OrderId { get; set; }
    public Order Order { get; set; } = null!;
}`)}
      </div>
      <div class="grid-2">
        <div class="card"><h3>1 : N</h3><p><b>Customer → Order</b><br>${lang==="hu"?"egy ügyfélhez sok rendelés":"one customer → many orders"}</p></div>
        <div class="card"><h3>1 : N</h3><p><b>Order → OrderItem</b><br>${lang==="hu"?"egy rendeléshez sok tétel":"one order → many items"}</p></div>
      </div>
      <div class="note">${lang==="hu"
        ? "<b>Miért navigation property?</b> Az EF Core ezeken keresztül tudja felépíteni és betölteni a kapcsolatot. A foreign key külön property-ként is ott van."
        : "<b>Why navigation properties?</b> EF Core uses them to understand and load relationships. The foreign key remains a separate property as well."}</div>
      ${navButtons("entities",lang)}
    `
  },

  dbcontext: {
    title: { hu: "DbContext", en: "DbContext" },
    html: ({lang}) => `
      <div class="card">
        <div class="kicker">05</div>
        <h3>AppDbContext</h3>
        <p>${lang==="hu"?"A DbContext az EF Core központi komponense: a DbSet-eket, kapcsolatokat, change trackinget és az adatbázis-műveletek egy részét kezeli.":"DbContext is the central EF Core component: it exposes DbSets, relationship mappings, change tracking and persistence operations."}</p>
        ${code("Data/AppDbContext.cs", `using Microsoft.EntityFrameworkCore;
using OrdersApi.Entities;

namespace OrdersApi.Data;

public class AppDbContext(DbContextOptions<AppDbContext> options)
    : DbContext(options)
{
    public DbSet<Customer> Customers => Set<Customer>();
    public DbSet<Order> Orders => Set<Order>();
    public DbSet<OrderItem> OrderItems => Set<OrderItem>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Customer>()
            .HasMany(c => c.Orders)
            .WithOne(o => o.Customer)
            .HasForeignKey(o => o.CustomerId)
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<Order>()
            .HasMany(o => o.Items)
            .WithOne(i => i.Order)
            .HasForeignKey(i => i.OrderId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<OrderItem>()
            .Property(i => i.UnitPrice)
            .HasPrecision(18, 2);
    }
}`)}
      </div>
      <div class="card">
        <h3>${lang==="hu"?"Mi történik itt?":"What happens here?"}</h3>
        <div class="step-list">
          <div class="step"><div class="step-num">1</div><div><div class="step-title">DbSet</div><div class="step-desc">${lang==="hu"?"Az EF Core táblákként kezeli a Customers, Orders és OrderItems halmazokat.":"EF Core treats Customers, Orders and OrderItems as database sets/tables."}</div></div></div>
          <div class="step"><div class="step-num">2</div><div><div class="step-title">Relationship mapping</div><div class="step-desc">${lang==="hu"?"Expliciten leírjuk az 1:N kapcsolatokat és a törlési viselkedést.":"We explicitly map the one-to-many relationships and delete behavior."}</div></div></div>
          <div class="step"><div class="step-num">3</div><div><div class="step-title">Scoped registration</div><div class="step-desc">${lang==="hu"?"A DI-ba AddDbContext-tal kerül be; web requestenként jellemzően egy context példány él.":"It is registered through AddDbContext; in a web request there is typically one context instance."}</div></div></div>
        </div>
      </div>
      ${navButtons("dbcontext",lang)}
    `
  },

  repository: {
    title: { hu: "Repository", en: "Repository" },
    html: ({lang}) => `
      <div class="card">
        <div class="kicker">06</div>
        <h3>${lang==="hu"?"Repository réteg: adat-hozzáférés":"Repository layer: data access"}</h3>
        <p>${lang==="hu"?"A Repository feladata itt kizárólag az adat-hozzáférés. Ne ide tedd az üzleti szabályokat és a HTTP logikát.":"The Repository is responsible only for data access. Keep business rules and HTTP concerns out of it."}</p>
        ${code("Repositories/IOrderRepository.cs", `using OrdersApi.Entities;

namespace OrdersApi.Repositories;

public interface IOrderRepository
{
    Task<List<Order>> GetAllAsync(CancellationToken cancellationToken);
    Task<Order?> GetByIdAsync(int id, CancellationToken cancellationToken);
    Task AddAsync(Order order, CancellationToken cancellationToken);
    void Remove(Order order);
    Task SaveChangesAsync(CancellationToken cancellationToken);
}`)}
        ${code("Repositories/OrderRepository.cs", `using Microsoft.EntityFrameworkCore;
using OrdersApi.Data;
using OrdersApi.Entities;

namespace OrdersApi.Repositories;

public class OrderRepository(AppDbContext db) : IOrderRepository
{
    public Task<List<Order>> GetAllAsync(CancellationToken cancellationToken) =>
        db.Orders
            .AsNoTracking()
            .Include(o => o.Customer)
            .Include(o => o.Items)
            .OrderByDescending(o => o.CreatedAtUtc)
            .ToListAsync(cancellationToken);

    public Task<Order?> GetByIdAsync(int id, CancellationToken cancellationToken) =>
        db.Orders
            .Include(o => o.Customer)
            .Include(o => o.Items)
            .SingleOrDefaultAsync(o => o.Id == id, cancellationToken);

    public Task AddAsync(Order order, CancellationToken cancellationToken) =>
        db.Orders.AddAsync(order, cancellationToken).AsTask();

    public void Remove(Order order) => db.Orders.Remove(order);

    public Task SaveChangesAsync(CancellationToken cancellationToken) =>
        db.SaveChangesAsync(cancellationToken);
}`)}
      </div>
      <div class="note yellow">${lang==="hu"
        ? "<b>Miért interface?</b> A Service az IOrderRepository-tól függ, nem az EF Core konkrét implementációjától. Ez könnyebbé teszi a tesztelést és a későbbi cserét."
        : "<b>Why an interface?</b> The Service depends on IOrderRepository, not on a concrete EF Core implementation. This improves testability and makes replacement easier."}</div>
      ${navButtons("repository",lang)}
    `
  },

  service: {
    title: { hu: "Service", en: "Service" },
    html: ({lang}) => `
      <div class="card">
        <div class="kicker">07</div>
        <h3>${lang==="hu"?"Service réteg: üzleti logika":"Service layer: business logic"}</h3>
        <p>${lang==="hu"?"Itt történik a DTO → Entity mapping, üzleti szabályok ellenőrzése és a Repository hívása.":"This is where DTO → Entity mapping, business rules and Repository calls live."}</p>
        ${code("Services/IOrderService.cs", `using OrdersApi.DTOs;

namespace OrdersApi.Services;

public interface IOrderService
{
    Task<IReadOnlyList<OrderResponse>> GetAllAsync(CancellationToken cancellationToken);
    Task<OrderResponse?> GetByIdAsync(int id, CancellationToken cancellationToken);
    Task<OrderResponse> CreateAsync(CreateOrderRequest request, CancellationToken cancellationToken);
    Task<bool> UpdateAsync(int id, UpdateOrderRequest request, CancellationToken cancellationToken);
    Task<bool> DeleteAsync(int id, CancellationToken cancellationToken);
}`)}
        ${code("Services/OrderService.cs", `using OrdersApi.DTOs;
using OrdersApi.Entities;
using OrdersApi.Repositories;

namespace OrdersApi.Services;

public class OrderService(IOrderRepository repository) : IOrderService
{
    public async Task<IReadOnlyList<OrderResponse>> GetAllAsync(
        CancellationToken cancellationToken)
    {
        var orders = await repository.GetAllAsync(cancellationToken);
        return orders.Select(Map).ToList();
    }

    public async Task<OrderResponse?> GetByIdAsync(
        int id,
        CancellationToken cancellationToken)
    {
        var order = await repository.GetByIdAsync(id, cancellationToken);
        return order is null ? null : Map(order);
    }

    public async Task<OrderResponse> CreateAsync(
        CreateOrderRequest request,
        CancellationToken cancellationToken)
    {
        if (request.Items.Count == 0)
            throw new ArgumentException("An order must contain at least one item.");

        var order = new Order
        {
            CustomerId = request.CustomerId,
            CreatedAtUtc = DateTime.UtcNow,
            Status = "Pending",
            Items = request.Items.Select(x => new OrderItem
            {
                ProductName = x.ProductName,
                Quantity = x.Quantity,
                UnitPrice = x.UnitPrice
            }).ToList()
        };

        await repository.AddAsync(order, cancellationToken);
        await repository.SaveChangesAsync(cancellationToken);

        var saved = await repository.GetByIdAsync(order.Id, cancellationToken);
        return Map(saved!);
    }

    public async Task<bool> UpdateAsync(
        int id,
        UpdateOrderRequest request,
        CancellationToken cancellationToken)
    {
        var order = await repository.GetByIdAsync(id, cancellationToken);
        if (order is null) return false;

        order.Status = request.Status;

        await repository.SaveChangesAsync(cancellationToken);
        return true;
    }

    public async Task<bool> DeleteAsync(
        int id,
        CancellationToken cancellationToken)
    {
        var order = await repository.GetByIdAsync(id, cancellationToken);
        if (order is null) return false;

        repository.Remove(order);
        await repository.SaveChangesAsync(cancellationToken);
        return true;
    }

    private static OrderResponse Map(Order order) =>
        new(
            order.Id,
            order.Status,
            order.CreatedAtUtc,
            order.Customer.Id,
            order.Customer.Name,
            order.Customer.Email,
            order.Items.Select(i =>
                new OrderItemResponse(
                    i.Id,
                    i.ProductName,
                    i.Quantity,
                    i.UnitPrice)).ToList());
}`)}
      </div>
      <div class="note green">${lang==="hu"
        ? "<b>Figyelem:</b> a példa szándékosan egyszerű. Nagyobb rendszernél érdemes külön validációs réteget, domain commandokat vagy transaction abstractiont is bevezetni."
        : "<b>Note:</b> the example is intentionally simple. Larger systems may introduce dedicated validation, commands or transaction abstractions."}</div>
      ${navButtons("service",lang)}
    `
  },

  dto: {
    title: { hu: "DTO + validáció", en: "DTO + validation" },
    html: ({lang}) => `
      <div class="card">
        <div class="kicker">08</div>
        <h3>DTO-k</h3>
        <p>${lang==="hu"?"A kliens nem közvetlenül az Entity osztályokkal kommunikál. A DTO definiálja, pontosan mit fogad és mit ad vissza az API.":"The client should not communicate directly with Entity classes. DTOs define exactly what the API accepts and returns."}</p>
        ${code("DTOs/OrderDtos.cs", `namespace OrdersApi.DTOs;

public record CreateOrderItemRequest(
    string ProductName,
    int Quantity,
    decimal UnitPrice);

public record CreateOrderRequest(
    int CustomerId,
    List<CreateOrderItemRequest> Items);

public record UpdateOrderRequest(
    string Status);

public record OrderItemResponse(
    int Id,
    string ProductName,
    int Quantity,
    decimal UnitPrice);

public record OrderResponse(
    int Id,
    string Status,
    DateTime CreatedAtUtc,
    int CustomerId,
    string CustomerName,
    string CustomerEmail,
    IReadOnlyList<OrderItemResponse> Items);`)}
      </div>
      <div class="card">
        <h3>${lang==="hu"?"Egyszerű validáció a Controllerben":"Simple validation in the Controller"}</h3>
        ${code("Controllers/OrdersController.cs · validation rész", `[HttpPost]
public async Task<ActionResult<OrderResponse>> Create(
    CreateOrderRequest request,
    CancellationToken cancellationToken)
{
    if (request.CustomerId <= 0)
        return BadRequest("CustomerId must be positive.");

    if (request.Items.Any(x =>
        x.Quantity <= 0 || x.UnitPrice < 0 || string.IsNullOrWhiteSpace(x.ProductName)))
        return BadRequest("Invalid order item.");

    var result = await service.CreateAsync(request, cancellationToken);
    return CreatedAtAction(nameof(GetById), new { id = result.Id }, result);
}`)}
        <div class="callout">${lang==="hu"
          ? "Éles projektben erre használhatsz FluentValidationt vagy más dedikált validációs megoldást is. A lényeg: a validáció helye legyen következetes."
          : "In production you can use FluentValidation or another dedicated validation approach. The important part is keeping validation consistent and explicit."}</div>
      </div>
      ${navButtons("dto",lang)}
    `
  },

  controller: {
    title: { hu: "Controller", en: "Controller" },
    html: ({lang}) => `
      <div class="card">
        <div class="kicker">09</div>
        <h3>OrdersController</h3>
        <p>${lang==="hu"?"A Controller vékony marad: route, HTTP státuszkód és Service hívása. A business logic nem itt lakik.":"Keep the Controller thin: routing, HTTP status codes and Service calls. Business logic does not belong here."}</p>
        ${code("Controllers/OrdersController.cs", `[ApiController]
[Route("api/[controller]")]
public class OrdersController(IOrderService service) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<IReadOnlyList<OrderResponse>>> GetAll(
        CancellationToken cancellationToken)
    {
        var result = await service.GetAllAsync(cancellationToken);
        return Ok(result);
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<OrderResponse>> GetById(
        int id,
        CancellationToken cancellationToken)
    {
        var result = await service.GetByIdAsync(id, cancellationToken);
        return result is null ? NotFound() : Ok(result);
    }

    [HttpPost]
    public async Task<ActionResult<OrderResponse>> Create(
        CreateOrderRequest request,
        CancellationToken cancellationToken)
    {
        if (request.CustomerId <= 0)
            return BadRequest("CustomerId must be positive.");

        var result = await service.CreateAsync(request, cancellationToken);

        return CreatedAtAction(
            nameof(GetById),
            new { id = result.Id },
            result);
    }

    [HttpPut("{id:int}")]
    public async Task<IActionResult> Update(
        int id,
        UpdateOrderRequest request,
        CancellationToken cancellationToken)
    {
        var updated = await service.UpdateAsync(
            id, request, cancellationToken);

        return updated ? NoContent() : NotFound();
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(
        int id,
        CancellationToken cancellationToken)
    {
        var deleted = await service.DeleteAsync(id, cancellationToken);
        return deleted ? NoContent() : NotFound();
    }
}`)}
      </div>
      <div class="grid-2">
        <div class="card"><h3>✅ Controller</h3><p>${lang==="hu"?"Route · Model binding · HTTP status · Service meghívása":"Route · model binding · HTTP status · service call"}</p></div>
        <div class="card"><h3>❌ Controller</h3><p>${lang==="hu"?"Komplex EF lekérdezés · üzleti szabályok tömege · SQL-szerű adatkezelés":"complex EF queries · lots of business rules · SQL-like data access"}</p></div>
      </div>
      ${navButtons("controller",lang)}
    `
  },

  config: {
    title: { hu: "Config + DI", en: "Config + DI" },
    html: ({lang}) => `
      <div class="card">
        <div class="kicker">10</div>
        <h3>appsettings.json</h3>
        ${code("appsettings.json", `{
  "ConnectionStrings": {
    "DefaultConnection": "Data Source=orders.db"
  },
  "ApiSettings": {
    "Name": "Orders API",
    "Version": "1.0"
  },
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    }
  }
}`)}
      </div>
      <div class="card">
        <h3>Configuration class + Options pattern</h3>
        ${code("Configuration/ApiSettings.cs", `namespace OrdersApi.Configuration;

public class ApiSettings
{
    public string Name { get; set; } = string.Empty;
    public string Version { get; set; } = string.Empty;
}`)}
      </div>
      <div class="card">
        <h3>Program.cs</h3>
        ${code("Program.cs", `using Microsoft.EntityFrameworkCore;
using OrdersApi.Configuration;
using OrdersApi.Data;
using OrdersApi.Repositories;
using OrdersApi.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

builder.Services.Configure<ApiSettings>(
    builder.Configuration.GetSection("ApiSettings"));

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite(
        builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddScoped<IOrderRepository, OrderRepository>();
builder.Services.AddScoped<IOrderService, OrderService>();

builder.Services.AddOpenApi();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();
app.MapControllers();

app.Run();`)}
        <div class="note">${lang==="hu"
          ? "<b>DI-lánc:</b> Controller → IOrderService → IOrderRepository → AppDbContext. A DI container a constructor paraméterekből építi fel a dependency graphot."
          : "<b>DI chain:</b> Controller → IOrderService → IOrderRepository → AppDbContext. The DI container builds the dependency graph from constructor parameters."}</div>
      </div>
      ${navButtons("config",lang)}
    `
  },

  flow: {
    title: { hu: "CRUD folyamat", en: "CRUD flow" },
    html: ({lang}) => `
      <div class="card">
        <div class="kicker">11</div>
        <h3>${lang==="hu"?"Mi történik egy POST kérésnél?":"What happens during a POST request?"}</h3>
        <div class="step-list">
          <div class="step"><div class="step-num">1</div><div><div class="step-title">HTTP → Controller</div><div class="step-desc">${lang==="hu"?"A JSON body CreateOrderRequest DTO-ba kerül.":"The JSON body is bound to CreateOrderRequest."}</div></div></div>
          <div class="step"><div class="step-num">2</div><div><div class="step-title">Controller → Service</div><div class="step-desc">${lang==="hu"?"A Controller validálja az alapvető inputot és továbbadja a Service-nek.":"The Controller performs basic input checks and calls the Service."}</div></div></div>
          <div class="step"><div class="step-num">3</div><div><div class="step-title">Service → Entity</div><div class="step-desc">${lang==="hu"?"A Service létrehozza az Order és OrderItem entity-ket.":"The Service creates the Order and OrderItem entities."}</div></div></div>
          <div class="step"><div class="step-num">4</div><div><div class="step-title">Service → Repository</div><div class="step-desc">${lang==="hu"?"A Repository hozzáadja az entity graphot a DbContexthez, majd SaveChangesAsync fut.":"The Repository adds the entity graph to DbContext and calls SaveChangesAsync."}</div></div></div>
          <div class="step"><div class="step-num">5</div><div><div class="step-title">EF Core → Database</div><div class="step-desc">${lang==="hu"?"Az EF Core SQL-t generál, és a megfelelő táblákba menti az adatokat.":"EF Core generates SQL and persists the data into the related tables."}</div></div></div>
          <div class="step"><div class="step-num">6</div><div><div class="step-title">Response</div><div class="step-desc">${lang==="hu"?"A Service DTO-t készít, a Controller pedig 201 Created választ ad.":"The Service creates a DTO and the Controller returns 201 Created."}</div></div></div>
        </div>
      </div>
      <div class="card">
        <h3>${lang==="hu"?"Teljes dependency flow":"Full dependency flow"}</h3>
        <div class="flow">
          <div class="node">OrdersController</div><div class="arrow">→</div>
          <div class="node">IOrderService</div><div class="arrow">→</div>
          <div class="node">IOrderRepository</div><div class="arrow">→</div>
          <div class="node">AppDbContext</div><div class="arrow">→</div>
          <div class="node">SQLite</div>
        </div>
      </div>
      <div class="note green">${lang==="hu"
        ? "<b>Lifetime:</b> Service és Repository tipikusan Scoped. A DbContext AddDbContext-tal szintén scoped. Így egy HTTP requesten belül ugyanahhoz a DbContext példányhoz kapcsolódnak."
        : "<b>Lifetime:</b> Service and Repository are typically Scoped. DbContext registered with AddDbContext is also scoped. This gives the request a consistent context."}</div>
      ${navButtons("flow",lang)}
    `
  },

  run: {
    title: { hu: "Futtatás + teszt", en: "Run + test" },
    html: ({lang}) => `
      <div class="card">
        <div class="kicker">12</div>
        <h3>${lang==="hu"?"1. Migration + adatbázis létrehozása":"1. Create migration + database"}</h3>
        ${code("terminal", `dotnet tool install --global dotnet-ef

dotnet ef migrations add InitialCreate
dotnet ef database update

dotnet run`)}
        <div class="callout">${lang==="hu"?"Az API URL-jét a konzol kiírja, például https://localhost:7xxx.":"The console prints the API URL, for example https://localhost:7xxx."}</div>
      </div>
      <div class="card">
        <h3>${lang==="hu"?"2. Hozz létre egy teszt ügyfelet":"2. Create a test customer"}</h3>
        <p>${lang==="hu"?"A jelenlegi CRUD példa a CustomerId-t várja, ezért a legegyszerűbb, ha először seedelsz egy ügyfelet. Tanulási célra a Program.cs végére ideiglenes seed kódot is tehetsz.":"The CRUD example expects CustomerId, so seed a test customer first. For learning, you can add temporary seed code at startup."}</p>
        ${code("Program.cs · ideiglenes seed példa", `using OrdersApi.Entities;

// app = builder.Build() után, app.Run() előtt:
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();

    if (!db.Customers.Any())
    {
        db.Customers.Add(new Customer
        {
            Name = "Jane Doe",
            Email = "jane@example.com"
        });

        db.SaveChanges();
    }
}`)}
      </div>
      <div class="card">
        <h3>${lang==="hu"?"3. POST /api/orders":"3. POST /api/orders"}</h3>
        ${code("request.json", `{
  "customerId": 1,
  "items": [
    {
      "productName": "Mechanical Keyboard",
      "quantity": 1,
      "unitPrice": 89.90
    },
    {
      "productName": "USB-C Cable",
      "quantity": 2,
      "unitPrice": 12.50
    }
  ]
}`)}
        <div class="callout">curl -X POST https://localhost:7xxx/api/orders \\<br/>-H "Content-Type: application/json" \\<br/>-d @request.json</div>
      </div>
      <div class="card">
        <h3>${lang==="hu"?"Ellenőrzőlista":"Checklist"}</h3>
        <div class="checklist">
          ${[
            "A projekt lefordul.",
            "A migration létrejön.",
            "Az orders.db létrejön.",
            "POST 201 Created választ ad.",
            "GET /api/orders visszaadja az új rendelést.",
            "PUT módosítja a status értékét.",
            "DELETE eltávolítja a rendelést és a tételeit."
          ].map((x,i)=>`<label class="check"><input type="checkbox" data-check="${i}"> ${lang==="hu"?x:[
            "The project builds.",
            "The migration is created.",
            "orders.db is created.",
            "POST returns 201 Created.",
            "GET /api/orders returns the new order.",
            "PUT changes the status.",
            "DELETE removes the order and its items."
          ][i]}</label>`).join("")}
        </div>
      </div>
      <div class="note">${lang==="hu"
        ? "<b>Következő lépés:</b> ha ezt már magabiztosan összerakod, a következő szint a külön projektekre bontás: OrdersApi.Web, OrdersApi.Application, OrdersApi.Infrastructure, OrdersApi.Domain."
        : "<b>Next step:</b> once this is comfortable, split the solution into separate projects: OrdersApi.Web, OrdersApi.Application, OrdersApi.Infrastructure, OrdersApi.Domain."}</div>
      ${navButtons("run",lang)}
    `
  }
};

const i18n = {
  hu: {
    brandSubtitle: "Lépésről lépésre felépített REST API minta",
    jumpToProject: "Projekt áttekintése",
    pageTitle: "Építsünk együtt egy Orders REST API-t",
    pageIntro: "A cél egy jól tagolt, modern Web API, amely ügyfeleket, rendeléseket és rendelési tételeket kezel.",
    tabOverview: "Áttekintés",
    tabProject: "Projektstruktúra",
    tabSetup: "Projekt létrehozása",
    tabEntities: "Entity-k",
    tabDbContext: "DbContext",
    tabRepository: "Repository",
    tabService: "Service",
    tabDto: "DTO + validáció",
    tabController: "Controller",
    tabConfig: "Config + DI",
    tabFlow: "CRUD folyamat",
    tabRun: "Futtatás + teszt",
    progress: "Haladás",
    tip: "Tipp: másold ki a kódblokkokat sorban, és ugyanilyen struktúrában hozd létre a saját projektedet.",
    footerText: "Tanulási célú sablon · A kódot saját projektedhez igazítsd."
  },
  en: {
    brandSubtitle: "A step-by-step REST API template",
    jumpToProject: "Project overview",
    pageTitle: "Build an Orders REST API step by step",
    pageIntro: "The goal is a clean modern Web API that manages customers, orders and order items.",
    tabOverview: "Overview",
    tabProject: "Project structure",
    tabSetup: "Create project",
    tabEntities: "Entities",
    tabDbContext: "DbContext",
    tabRepository: "Repository",
    tabService: "Service",
    tabDto: "DTO + validation",
    tabController: "Controller",
    tabConfig: "Config + DI",
    tabFlow: "CRUD flow",
    tabRun: "Run + test",
    progress: "Progress",
    tip: "Tip: copy the code blocks in order and build your own project with the same structure.",
    footerText: "Learning template · Adapt the code to your own project."
  }
};

let currentLang = localStorage.getItem("api-guide-lang") || "hu";
let currentTab = localStorage.getItem("api-guide-tab") || "overview";

function code(path, content) {
  const id = "code-" + Object.keys(snippets).length;
  snippets[id] = content.trim();
  return `
    <div class="code-card" style="margin-top:12px">
      <div class="code-head">
        <div class="code-path">${escapeHtml(path)}</div>
        <button class="copy-btn" data-copy="${id}">${currentLang === "hu" ? "Másolás" : "Copy"}</button>
      </div>
      <pre><code>${escapeHtml(content.trim())}</code></pre>
    </div>
  `;
}

function escapeHtml(s) {
  return s.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;");
}

function navButtons(key, lang) {
  const keys = Object.keys(sections);
  const idx = keys.indexOf(key);
  const prev = idx > 0 ? keys[idx - 1] : null;
  const next = idx < keys.length - 1 ? keys[idx + 1] : null;
  return `
    <div class="prev-next">
      <button class="nav-btn" ${prev ? `data-go="${prev}"` : "disabled"}>${prev ? "← " + sections[prev].title[lang] : ""}</button>
      <button class="nav-btn primary" ${next ? `data-go="${next}"` : "disabled"}>${next ? sections[next].title[lang] + " →" : (lang==="hu"?"Kész":"Done")}</button>
    </div>
  `;
}

function applyI18n() {
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.dataset.i18n;
    if (i18n[currentLang][key]) el.textContent = i18n[currentLang][key];
  });
  document.querySelectorAll(".lang-btn").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.lang === currentLang);
  });
}

function render() {
  Object.keys(snippets).forEach(k => delete snippets[k]);
  document.getElementById("app").innerHTML = sections[currentTab].html({lang: currentLang});
  document.getElementById("sectionTitle").textContent = sections[currentTab].title[currentLang];
  document.querySelectorAll(".tab").forEach(tab => {
    tab.classList.toggle("active", tab.dataset.tab === currentTab);
  });
  const keys = Object.keys(sections);
  const pos = keys.indexOf(currentTab) + 1;
  document.getElementById("progressText").textContent = `${pos} / ${keys.length}`;
  document.getElementById("progressBar").style.width = `${(pos / keys.length) * 100}%`;
  applyI18n();

  document.querySelectorAll("[data-copy]").forEach(btn => {
    btn.addEventListener("click", async () => {
      const value = snippets[btn.dataset.copy];
      try {
        await navigator.clipboard.writeText(value);
        const original = btn.textContent;
        btn.textContent = currentLang === "hu" ? "Másolva ✓" : "Copied ✓";
        setTimeout(() => btn.textContent = original, 1200);
      } catch {
        btn.textContent = currentLang === "hu" ? "Nem sikerült" : "Failed";
      }
    });
  });

  document.querySelectorAll("[data-go]").forEach(btn => {
    btn.addEventListener("click", () => goTo(btn.dataset.go));
  });

  document.querySelectorAll("[data-check]").forEach(chk => {
    const key = `check-${currentTab}-${chk.dataset.check}`;
    chk.checked = localStorage.getItem(key) === "1";
    chk.addEventListener("change", () => {
      localStorage.setItem(key, chk.checked ? "1" : "0");
    });
  });
}

function goTo(tab) {
  currentTab = tab;
  localStorage.setItem("api-guide-tab", currentTab);
  render();
  window.scrollTo({top: 0, behavior: "smooth"});
}

document.getElementById("tabs").addEventListener("click", (e) => {
  const btn = e.target.closest(".tab");
  if (!btn) return;
  goTo(btn.dataset.tab);
});

document.querySelectorAll(".lang-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    currentLang = btn.dataset.lang;
    localStorage.setItem("api-guide-lang", currentLang);
    render();
  });
});

render();
