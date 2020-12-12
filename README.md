##### Creating the project references using the dotnet CLI

```
$ mkdir project
$ cd project
$ dotnet --info
$ dotnet --version
$ dotnet new -h
$ dotnet new globaljson
```
in globaljson -> check the project to use dotnet core version
if differ version
change in global.json

```
$ dotnet new sln
$ dotnet new classlib -n Domain
$ dotnet new classlib -n Application
$ dotnet new classlib -n Persistence
$ dotnet new webapi -n API
```
create project
`-n` is naming

```
$ dotnet sln add Domain
$ dotnet sln add Application
$ dotnet sln add Persistence
$ dotnet sln add API
$ dotnet sln list
```
create project's solution

```
$ cd Application
$ dotnet add reference ../Domain
$ dotnet add reference ../Persistence
$ cd ../API
$ dotnet add reference ../Application
$ cd ../Persistence
$ dotnet add reference ../Domain
```
connect reference

##### Running the application
```
$ dotnet run -p API/
```

##### VS code short cut
Toggle Terminal `Ctrl + @`
Open Command Pallet `Ctrl + Shift + P`

##### NuGet Package Manager - Entity Framework
- Open Command Pallet
- NuGet Package Manager: Add Package
- Microsoft.EntityFrameworkCore
- 3.1.4
- {root}/Persistence/Persistence.csproj
- Microsoft.EntityFrameworkCore.Sqlite
- 3.1.4
- {root}/Persistence/Persistence.csproj
- in terminal `$ dotnet restore`

##### DB Connection Strings
API/Startup.cs
```
public void ConfigureServices(IServiceCollection services)
{
    services.AddDbContext<DataContext>(opt =>
    {
        opt.UseSqlite(Configuration.GetConnectionString("DefaultConnection"));
    });
}
```
API/appsettings.json
```
"ConnectionStrings": {
    "DefaultConnection" : "Data source=reactivities.db"
},
```

##### Adding first Entity Framework code and first migration
if dotnet version over 3.0
`$ dotnet tool install --global dotnet-ef`
Add NuGet Manger
- Open Command Pallet
- NuGet Package Manager
- Microsoft.EntityFrameworkCore.Design
- 3.1.4
- {root}/API/API.csproj

`$ dotnet ef migrations add InitialCreate -p Persistence/ -s API/`

API/Program.cs
```
public static void Main(String[] args)
{
    var host = CreateHostBuilder(args).Build();

    using (var scope = host.Services.CreateScope())
    {
        var services = scope.ServiceProvider;
        try
        {
            var context = services.GetRequiredService<DataContext>();
            context.Database.Migrate();
        }
        catch (Exception ex)
        {
            var logger = services.GetRequiredService<ILogger<Program>>();
            logger.LogError(ex, "An error occured during migration");
        }
    }
    host.Run();
}
```
```
$ cd API
$ dotnet watch run
```
- open command pallet
- SQLite: Open Database
- reactivities.db

##### Seeding data
Persistence/DataContext.cs
```
protected override void OnModelCreating(ModelBuilder builder)
{
    builder.Entity<Value>()
        .HasData(
            new Value {Id = 1, Name = "Value 101"},
            new Value {Id = 2, Name = "Value 102"},
            new Value {Id = 3, Name = "Value 103"}
        );
}
```
`$ dotnet ef migrations add SeedValues -p Persistence/ -s API/`

##### client side
`$ npx create-react-app client-app --use-npm --template typescript`
start
`$ npm start`

##### connect api
`$ npm istall axios`
App.tsx
```
import axios from 'axios';
componentDidMount() {
    axios.get('http://localhost:5000/api/values')
        .then.setState({
            values: response.data
    })
}
```
Startup.cs
```
public void ConfiguresServices(IServiceCollection services)
{
    services.AddCors(opt =>
    {
        opt.AddPolicy("CorsPolicy", policy =>
        {
            policy.AllowAnyHeader()
                .AllowAnyMethod()
                .WithOrigins("http://localhost:3000");
        });
    });
}
public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
{
    app.UseCors("CorsPolicy");
}
```

###### css framework
[semantic ui react](https://react.semantic-ui.com/)
`$ npm install semantic-ui-react semantic-ui-css`
