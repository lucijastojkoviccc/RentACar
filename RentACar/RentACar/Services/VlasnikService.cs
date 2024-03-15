using RentACar.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace RentACar.Services;

public class VlasnikService
{
    private readonly IMongoCollection<Vlasnik> _vlasnikCollection;
    private readonly IMongoCollection<Auto> _autoCollection;

    public VlasnikService(IOptions<DatabaseSettings> DatabaseSettings)
    {
        var mongoClient = new MongoClient(DatabaseSettings.Value.ConnectionString);
        var mongoDatabase = mongoClient.GetDatabase(DatabaseSettings.Value.DatabaseName);

        _vlasnikCollection = mongoDatabase.GetCollection<Vlasnik>(
            DatabaseSettings.Value.VlasniciCollectionName);
    }

    public async Task<List<Vlasnik>> GetAsync() =>
       await _vlasnikCollection.Find(_ => true).ToListAsync();

    public async Task<Vlasnik> GetAsync(string id) =>
        await _vlasnikCollection.Find(x => x.Id == id).FirstOrDefaultAsync();

    public async Task<Vlasnik> GetByCompanyAsync(string kompanija)=>    
        await _vlasnikCollection.Find(v=>v.Kompanija == kompanija).FirstOrDefaultAsync();
    

    public async Task CreateAsync(Vlasnik noviVlasnik) =>
        await _vlasnikCollection.InsertOneAsync(noviVlasnik);

    public async Task UpdateAsync(string id, Vlasnik azuriranVlasnik) =>
        await _vlasnikCollection.ReplaceOneAsync(x => x.Id == id, azuriranVlasnik);

    public async Task RemoveAsync(string id) =>
        await _vlasnikCollection.DeleteOneAsync(x => x.Id == id);
    //public async Task<Vlasnik> FindByUsername(string username)=>    
    //     await _vlasnikCollection.Find(u => u.Username == username).FirstOrDefaultAsync();
    
    public async Task<List<Auto>> GetAutomobiliByCompanyAsync(string kompanija)
    {
        var vlasnik = await GetByCompanyAsync(kompanija);

        if (vlasnik != null)
        {
            // Filtriraj automobile na osnovu ID-ijeva u listi AutomobiliID vlasnika
            return await _autoCollection.Find(a => vlasnik.AutoIds.Contains(a.Id)).ToListAsync();
        }

        return new List<Auto>();
    }

}
