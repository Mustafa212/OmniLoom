namespace API;
using System.ComponentModel.DataAnnotations;

public class Products
{
        [Key]
        public int Id { get; set; }

        [Required(ErrorMessage = "Name is required")]
        [MaxLength(50, ErrorMessage = "Max 50 Characters allowed")]
        public  required string Name { get; set; }

        [Required(ErrorMessage = "Brandd is required")]
        [MaxLength(100, ErrorMessage = "Max 100 Characters allowed")]
        public required string Brand { get; set; }

        [Required(ErrorMessage = "Password is required")]
        public int Price { get; set; }
        
        public string? photoUrl { get; set; }
}
