using RentACar.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace RentACar.Services;

public class KlijentService
{
    private readonly IMongoCollection<Klijent> _clientCollection;

    public KlijentService(IOptions<DatabaseSettings> DatabaseSettings)
    {
        var mongoClient = new MongoClient(DatabaseSettings.Value.ConnectionString);
        var mongoDatabase = mongoClient.GetDatabase(DatabaseSettings.Value.DatabaseName);

        _clientCollection = mongoDatabase.GetCollection<Klijent>(
            DatabaseSettings.Value.KlijentiCollectionName);
    }

    public async Task<List<Klijent>> GetAsync() =>
       await _clientCollection.Find(_ => true).ToListAsync();

    public async Task<Klijent> GetAsync(string id) =>
        await _clientCollection.Find(x => x.Id == id).FirstOrDefaultAsync();

    public async Task CreateAsync(Klijent newClient) =>
        await _clientCollection.InsertOneAsync(newClient);

    public async Task UpdateAsync(string id, Klijent updatedClient) =>
        await _clientCollection.ReplaceOneAsync(x => x.Id == id, updatedClient);

    public async Task RemoveAsync(string id) =>
        await _clientCollection.DeleteOneAsync(x => x.Id == id);

    //public async Task<Klijent> FindByUsername(string username) =>
    // await _clientCollection.Find(u => u.Username == username).FirstOrDefaultAsync();

}
