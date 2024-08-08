using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace API.Entities;


public class UserAccount
{
    // [Index(nameof(Email), IsUnique = true)]
    // [Index(nameof(UserName), IsUnique = true)]  
    [Key]
    public int Id { get; set; }

    [Required(ErrorMessage = "Frist name is required")]
    [MaxLength(50, ErrorMessage = "Max 50 Characters allowed")]
    public string FristName { get; set; }

    [Required(ErrorMessage = "Last name is required")]
    [MaxLength(50, ErrorMessage = "Max 50 Characters allowed")]
    public string LastName { get; set; }

    [Required(ErrorMessage = "Email is required")]
    [MaxLength(100, ErrorMessage = "Max 100 Characters allowed")]
    public string Email { get; set; }

    [Required(ErrorMessage = "Username is required")]
    [MaxLength(20, ErrorMessage = "Max 20 Characters allowed")]
    public string UserName { get; set; }

    [Required(ErrorMessage = "Password is required")]
    [MaxLength(20, ErrorMessage = "Max 20 Characters allowed")]
    public string Password { get; set; }
    

}

