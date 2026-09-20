var builder = WebApplication.CreateBuilder(args);
builder.Services.AddControllersWithViews();
var app = builder.Build();

if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();
app.UseAuthorization();

// --- FORCE robots.txt and sitemap.xml to work even if wwwroot fails ---
app.MapGet("/robots.txt", () => "User-agent: *\nAllow: /\nSitemap: https://haveit-design-ke-e3g4gverbndkfjaz.southafricanorth-01.azurewebsites.net/sitemap.xml");
app.MapGet("/sitemap.xml", () => Results.Content(
@"<?xml version=""1.0"" encoding=""UTF-8""?>
<urlset xmlns=""http://www.sitemaps.org/schemas/sitemap/0.9"">
  <url><loc>https://haveit-design-ke-e3g4gverbndkfjaz.southafricanorth-01.azurewebsites.net/</loc><changefreq>weekly</changefreq><priority>1.0</priority></url>
  <url><loc>https://haveit-design-ke-e3g4gverbndkfjaz.southafricanorth-01.azurewebsites.net/Home/Privacy</loc><priority>0.3</priority></url>
  <url><loc>https://haveit-design-ke-e3g4gverbndkfjaz.southafricanorth-01.azurewebsites.net/Home/Terms</loc><priority>0.3</priority></url>
</urlset>", "application/xml"));
// --- END FIX ---

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();