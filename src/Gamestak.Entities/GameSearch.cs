using System.Collections.Generic;

namespace Gamestak.Entities
{
    public class GameSearch
    {
        public int? OwnerID { get; set; }
        public string SearchTerm { get; set; }
        public SortType SortBy { get; set; }
        public List<int> Categories { get; set; }
        public List<int> Features { get; set; }
    }

    public enum SortType
    {
        NewerFirst = 0,
        OlderFirst = 1,
        AZ = 2,
        ZA = 3,
        PriceLowToHigh = 4,
        PriceHighToLow = 5,
    }
}
