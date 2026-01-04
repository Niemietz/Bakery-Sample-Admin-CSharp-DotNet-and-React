var builder = WebApplication.CreateBuilder(args);
builder.Services.AddControllers();
builder.Services.AddCors(options =>
{
    options.AddPolicy("DevCors", policy =>
    {
        policy
            .WithOrigins("http://localhost:3001", "http://127.0.0.1:3001")
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});
var app = builder.Build();

app.UseCors("DevCors");

app.UseDefaultFiles();
app.UseStaticFiles();

// API routes
//app.MapControllers();

app.MapControllerRoute(
    name: "api",
    pattern: "{controller=Api}/{action=Data}"
);

// React fallback (important!)
app.MapFallbackToFile("index.html");

app.Run();

/*
// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}"
);

app.MapControllerRoute(
    name: "contact",
    pattern: "{controller=Contact}/{action=Contact}"
);

app.MapControllerRoute(
    name: "api",
    pattern: "{controller=Api}/{action=Data}"
);

app.Run();
*/